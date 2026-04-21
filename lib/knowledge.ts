import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_PATH = path.join(process.cwd(), 'lib', 'data', 'knowledge.json');

export interface KnowledgeEntry {
  id: string;
  timestamp: string;
  category: string;
  content: string;
  metadata: Record<string, unknown>;
}

interface KnowledgeStore {
  entries: KnowledgeEntry[];
}

export function loadKnowledge(): KnowledgeStore {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as KnowledgeStore;
  } catch {
    return { entries: [] };
  }
}

export function saveKnowledge(store: KnowledgeStore): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), 'utf-8');
}

export function addEntry(
  content: string,
  category: string,
  metadata: Record<string, unknown> = {}
): KnowledgeEntry {
  const store = loadKnowledge();
  const entry: KnowledgeEntry = {
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    category,
    content,
    metadata,
  };
  store.entries.push(entry);
  saveKnowledge(store);
  return entry;
}

export function deleteEntry(id: string): boolean {
  const store = loadKnowledge();
  const before = store.entries.length;
  store.entries = store.entries.filter(e => e.id !== id);
  if (store.entries.length < before) {
    saveKnowledge(store);
    return true;
  }
  return false;
}

export function buildSystemPrompt(store: KnowledgeStore): string {
  const knowledgeText = store.entries
    .sort((a, b) => {
      const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
      const ap = (a.metadata.priority as string) || 'medium';
      const bp = (b.metadata.priority as string) || 'medium';
      return (priorityOrder[ap] ?? 1) - (priorityOrder[bp] ?? 1);
    })
    .map(e => `[${e.category.toUpperCase()}]\n${e.content}`)
    .join('\n\n---\n\n');

  return `Eres el asistente inteligente de Rodrigo De La Torre — arquitecto de sistemas de IA, CEO de Orion AI Consulting y fundador de Orion AI Society.

Tu rol es responder preguntas de visitantes al portafolio de Rodrigo de manera clara, concisa y con el tono de la marca: culto, directo, sin humo. Representas a Rodrigo y su trabajo.

CONOCIMIENTO BASE:
${knowledgeText}

DIRECTRICES:
- Responde en el mismo idioma en que te escriban (español o inglés)
- Sé conciso — máximo 3-4 párrafos por respuesta
- Si no tienes información específica sobre algo, di que para ese nivel de detalle lo ideal es hablar directamente con Rodrigo
- Para agendar, dirige al email: rodrigo@orionai.consulting
- Para la Society, dirige a: skool.com/orion-ai-society
- Para el canal de YouTube: youtube.com/@RodrigoDeLaTorre-AI
- Nunca inventes precios ni fechas específicas que no estén en tu conocimiento base
- Mantén el tono: profesional, preciso, con carácter propio`;
}
