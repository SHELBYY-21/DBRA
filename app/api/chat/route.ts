import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'

import { pipelineContext } from '@/lib/pipeline-data'

export const maxDuration = 30

export async function POST(request: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json()

    if (!Array.isArray(messages)) {
      return Response.json({ error: 'Invalid message history.' }, { status: 400 })
    }

    const result = streamText({
      model: 'openai/gpt-5.4-mini',
      instructions: `You are Relay, a concise SalesOps copilot. Answer only from the supplied demo pipeline context. Clearly say when the data cannot answer a question. Prioritize risks, concrete next actions, owners, and values. Use short bullets when useful and never imply this is connected to a live CRM.\n\n${pipelineContext}`,
      messages: await convertToModelMessages(messages),
    })

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    })
  } catch (error) {
    const isAuthError =
      error instanceof Error &&
      /oidc|gateway|unauthorized|authentication|credential/i.test(error.message)

    return Response.json(
      {
        error: isAuthError
          ? 'AI Gateway authentication is unavailable. Link this project to Vercel and refresh its OIDC credentials.'
          : 'The copilot could not start a response.',
      },
      { status: isAuthError ? 503 : 500 },
    )
  }
}
