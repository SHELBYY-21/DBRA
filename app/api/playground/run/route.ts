import { Sandbox } from '@vercel/sandbox'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 30

const MAX_SOURCE_LENGTH = 20_000
const COMMAND_TIMEOUT_MS = 10_000
const SANDBOX_TIMEOUT_MS = 15_000

type PlaygroundRuntime = 'javascript' | 'python'

const runtimes: Record<
  PlaygroundRuntime,
  { runtime: 'node24' | 'python3.13'; command: string; filename: string }
> = {
  javascript: {
    runtime: 'node24',
    command: 'node',
    filename: 'main.js',
  },
  python: {
    runtime: 'python3.13',
    command: 'python3',
    filename: 'main.py',
  },
}

function isRuntime(value: unknown): value is PlaygroundRuntime {
  return value === 'javascript' || value === 'python'
}

export async function POST(request: Request) {
  let sandbox: Awaited<ReturnType<typeof Sandbox.create>> | undefined
  const startedAt = performance.now()

  try {
    const body: unknown = await request.json()

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const { source, runtime: requestedRuntime } = body as Record<string, unknown>

    if (!isRuntime(requestedRuntime) || typeof source !== 'string') {
      return NextResponse.json(
        { error: 'Choose JavaScript or Python and provide source code.' },
        { status: 400 },
      )
    }

    if (!source.trim()) {
      return NextResponse.json({ error: 'Add some code before running.' }, { status: 400 })
    }

    if (source.length > MAX_SOURCE_LENGTH) {
      return NextResponse.json(
        { error: `Source code must be ${MAX_SOURCE_LENGTH.toLocaleString()} characters or fewer.` },
        { status: 413 },
      )
    }

    const config = runtimes[requestedRuntime]
    sandbox = await Sandbox.create({
      runtime: config.runtime,
      timeout: SANDBOX_TIMEOUT_MS,
      networkPolicy: 'deny-all',
      resources: { vcpus: 1 },
      tags: { purpose: 'salesops-playground' },
    })

    const filePath = `${sandbox.cwd}/${config.filename}`
    await sandbox.fs.writeFile(filePath, source)

    const command = await sandbox.runCommand(config.command, [filePath], {
      timeoutMs: COMMAND_TIMEOUT_MS,
    })
    const [stdout, stderr] = await Promise.all([command.stdout(), command.stderr()])

    return NextResponse.json({
      stdout,
      stderr,
      exitCode: command.exitCode,
      durationMs: command.durationMs ?? Math.round(performance.now() - startedAt),
      runtime: config.runtime,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : ''
    const isTimeout = message.includes('timeout') || message.includes('timed out')
    const isAuth = message.includes('oidc') || message.includes('credential') || message.includes('unauthorized')

    return NextResponse.json(
      {
        error: isTimeout
          ? 'Execution exceeded the 10 second limit.'
          : isAuth
            ? 'Sandbox authentication is unavailable in this environment. Deploy or link this project to Vercel.'
            : 'The sandbox could not complete this run. Please try again.',
      },
      { status: isTimeout ? 408 : 500 },
    )
  } finally {
    if (sandbox) {
      await sandbox.stop().catch(() => undefined)
    }
  }
}
