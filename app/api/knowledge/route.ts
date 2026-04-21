import { NextRequest } from 'next/server';
import { loadKnowledge, addEntry, deleteEntry } from '@/lib/knowledge';

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.KNOWLEDGE_API_SECRET;
  if (!secret) return false;
  const auth = req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '');
  return auth === secret;
}

// GET /api/knowledge — list all entries (protected)
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const store = loadKnowledge();
  return Response.json({ entries: store.entries, total: store.entries.length });
}

// POST /api/knowledge — add a new entry (protected)
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { content, category = 'general', metadata = {} } = await req.json() as {
      content: string;
      category?: string;
      metadata?: Record<string, unknown>;
    };

    if (!content?.trim()) {
      return Response.json({ error: 'content is required' }, { status: 400 });
    }

    const entry = addEntry(content, category, metadata);
    return Response.json({ success: true, entry }, { status: 201 });
  } catch (error) {
    console.error('Knowledge API error:', error);
    return Response.json({ error: 'Error processing request' }, { status: 500 });
  }
}

// DELETE /api/knowledge?id=xxx — delete an entry (protected)
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ error: 'id is required' }, { status: 400 });
  }

  const deleted = deleteEntry(id);
  if (!deleted) {
    return Response.json({ error: 'Entry not found' }, { status: 404 });
  }

  return Response.json({ success: true, deleted: id });
}
