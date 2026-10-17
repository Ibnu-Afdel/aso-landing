import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  const entry = await getEntry('docs', 'index');
  if (!entry) return new Response('Not found', { status: 404 });

  const front = ['---', `title: ${entry.data.title}`, `description: ${entry.data.description}`, '---', ''].join('\n');

  return new Response(front + entry.body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
