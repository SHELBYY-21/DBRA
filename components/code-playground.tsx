'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  CircleStop,
  Clock3,
  Code2,
  Copy,
  Play,
  RotateCcw,
  TerminalSquare,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type PlaygroundRuntime = 'javascript' | 'python'

type RunResult = {
  stdout: string
  stderr: string
  exitCode: number
  durationMs: number
  runtime: string
}

const examples: Record<PlaygroundRuntime, string> = {
  javascript: `const pipeline = [
  { stage: "Prospecting", deals: 42, value: 186000 },
  { stage: "Qualified", deals: 27, value: 142500 },
  { stage: "Proposal", deals: 12, value: 98000 },
];

const total = pipeline.reduce((sum, stage) => sum + stage.value, 0);
console.log("Pipeline snapshot");
console.table(pipeline);
console.log(\`Total value: $\${total.toLocaleString()}\`);`,
  python: `pipeline = [
    {"stage": "Prospecting", "deals": 42, "value": 186000},
    {"stage": "Qualified", "deals": 27, "value": 142500},
    {"stage": "Proposal", "deals": 12, "value": 98000},
]

total = sum(stage["value"] for stage in pipeline)
print("Pipeline snapshot")
for stage in pipeline:
    print(f'{stage["stage"]:<12} {stage["deals"]:>2} deals  \${stage["value"]:,}')
print(f"Total value: \${total:,}")`,
}

export function CodePlayground() {
  const [runtime, setRuntime] = useState<PlaygroundRuntime>('javascript')
  const [source, setSource] = useState(examples.javascript)
  const [result, setResult] = useState<RunResult | null>(null)
  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const lineNumbers = useMemo(
    () => Array.from({ length: Math.max(source.split('\n').length, 1) }, (_, index) => index + 1),
    [source],
  )

  const changeRuntime = (nextRuntime: PlaygroundRuntime) => {
    if (nextRuntime === runtime) return
    setRuntime(nextRuntime)
    setSource(examples[nextRuntime])
    setResult(null)
    setError('')
  }

  const runCode = useCallback(async () => {
    if (!source.trim() || isRunning) return

    setIsRunning(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/playground/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ runtime, source }),
      })
      const data = (await response.json()) as RunResult & { error?: string }

      if (!response.ok) {
        throw new Error(data.error || 'Execution failed.')
      }

      setResult(data)
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : 'Execution failed.')
    } finally {
      setIsRunning(false)
    }
  }, [isRunning, runtime, source])

  const copyOutput = async () => {
    const output = [result?.stdout, result?.stderr, error].filter(Boolean).join('\n')
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Code2 aria-hidden="true" className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Untitled analysis</h2>
            <p className="text-xs text-muted-foreground">Single-file sandbox</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="relative">
            <span className="sr-only">Runtime</span>
            <select
              className="h-8 appearance-none rounded-lg border bg-background py-1 pl-3 pr-8 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={runtime}
              onChange={(event) => changeRuntime(event.target.value as PlaygroundRuntime)}
              disabled={isRunning}
            >
              <option value="javascript">JavaScript · Node 24</option>
              <option value="python">Python · 3.13</option>
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
          </label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSource(examples[runtime])
              setResult(null)
              setError('')
            }}
            disabled={isRunning}
          >
            <RotateCcw data-icon="inline-start" />
            Reset
          </Button>
          <Button size="sm" onClick={runCode} disabled={isRunning || !source.trim()}>
            {isRunning ? <CircleStop data-icon="inline-start" /> : <Play data-icon="inline-start" />}
            {isRunning ? 'Running' : 'Run code'}
            <kbd className="hidden rounded border border-primary-foreground/20 px-1 font-mono text-[10px] md:inline">⌘↵</kbd>
          </Button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="flex min-h-80 flex-col border-b lg:border-b-0 lg:border-r">
          <div className="flex h-9 items-center justify-between border-b bg-muted/40 px-3">
            <span className="font-mono text-xs text-muted-foreground">
              {runtime === 'javascript' ? 'main.js' : 'main.py'}
            </span>
            <span className="text-[11px] text-muted-foreground">{source.length.toLocaleString()} / 20,000</span>
          </div>
          <div className="relative flex min-h-0 flex-1 overflow-hidden bg-editor text-editor-foreground">
            <div aria-hidden="true" className="select-none border-r border-editor-border px-3 py-4 text-right font-mono text-sm leading-6 text-editor-muted">
              {lineNumbers.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            <textarea
              aria-label="Source code"
              className="min-h-80 flex-1 resize-none overflow-auto bg-transparent p-4 font-mono text-sm leading-6 caret-primary outline-none placeholder:text-editor-muted"
              value={source}
              maxLength={20_000}
              spellCheck={false}
              onChange={(event) => setSource(event.target.value)}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                  if (event.nativeEvent.isComposing || event.keyCode === 229) return
                  event.preventDefault()
                  void runCode()
                }
              }}
            />
          </div>
        </div>

        <div className="flex min-h-72 flex-col bg-terminal text-terminal-foreground">
          <div className="flex h-9 items-center justify-between border-b border-terminal-border px-3">
            <div className="flex items-center gap-2">
              <TerminalSquare aria-hidden="true" className="size-3.5 text-terminal-muted" />
              <span className="font-mono text-xs">Output</span>
            </div>
            <Button
              aria-label="Copy output"
              variant="ghost"
              size="icon-xs"
              className="text-terminal-muted hover:bg-terminal-border hover:text-terminal-foreground"
              onClick={copyOutput}
              disabled={!result && !error}
            >
              {copied ? <CheckCircle2 /> : <Copy />}
            </Button>
          </div>

          <div className="min-h-0 flex-1 overflow-auto p-4 font-mono text-xs leading-6" aria-live="polite">
            {isRunning ? (
              <div className="flex items-center gap-2 text-terminal-muted">
                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                Provisioning isolated microVM…
              </div>
            ) : error ? (
              <pre className="whitespace-pre-wrap text-destructive">{error}</pre>
            ) : result ? (
              <div className="flex flex-col gap-4">
                {result.stdout && <pre className="whitespace-pre-wrap">{result.stdout}</pre>}
                {result.stderr && <pre className="whitespace-pre-wrap text-destructive">{result.stderr}</pre>}
                {!result.stdout && !result.stderr && <p className="text-terminal-muted">Process completed with no output.</p>}
              </div>
            ) : (
              <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 text-center text-terminal-muted">
                <div className="flex size-10 items-center justify-center rounded-lg border border-terminal-border">
                  <TerminalSquare aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="text-terminal-foreground">Ready to run</p>
                  <p className="mt-1 text-[11px]">Output from your isolated sandbox appears here.</p>
                </div>
              </div>
            )}
          </div>

          <footer className="flex min-h-9 items-center justify-between gap-3 border-t border-terminal-border px-3 text-[11px] text-terminal-muted">
            <span className="flex items-center gap-1.5">
              <span className={cn('size-1.5 rounded-full', result?.exitCode === 0 ? 'bg-primary' : 'bg-terminal-muted')} />
              {result ? `Exited ${result.exitCode}` : isRunning ? 'Executing' : 'Idle'}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 aria-hidden="true" className="size-3" />
              {result ? `${result.durationMs} ms · ${result.runtime}` : '10s limit'}
            </span>
          </footer>
        </div>
      </div>
    </section>
  )
}
