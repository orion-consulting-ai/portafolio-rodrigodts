import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { loadKnowledge, buildSystemPrompt } from '@/lib/knowledge';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json() as {
      message: string;
      history: Array<{ role: 'user' | 'assistant'; content: string }>;
    };

    if (!message?.trim()) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const store = loadKnowledge();
    const systemPrompt = buildSystemPrompt(store);

    // Build conversation messages (last 10 for context window efficiency)
    const messages = [
      ...history.slice(-10).map(m => ({
        role: m.role,
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ];

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          // Prompt caching for the knowledge base (saves tokens on repeated calls)
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages,
    });

    const content = response.content[0].type === 'text'
      ? response.content[0].text
      : 'No pude generar una respuesta.';

    const usage = response.usage as unknown as Record<string, number>;
    return Response.json({
      content,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
        cache_read_input_tokens: usage.cache_read_input_tokens ?? 0,
        cache_creation_input_tokens: usage.cache_creation_input_tokens ?? 0,
      },
    });
  } catch (error) {
    console.error('Agent API error:', error);
    return Response.json(
      { error: 'Error processing request', content: 'Lo siento, ocurrió un error. Por favor intenta de nuevo.' },
      { status: 500 }
    );
  }
}
