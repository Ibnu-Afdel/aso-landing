import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function hrefFor(id: string): string {
  const trimmed = id.replace(/\/index$/, '');
  return trimmed === '' || trimmed === 'index' ? '/docs' : `/docs/${trimmed}`;
}

export const GET: APIRoute = async ({ site }) => {
  const entries = (await getCollection('docs')).sort((a, b) => a.data.order - b.data.order);
  const base = site?.toString().replace(/\/$/, '') ?? 'https://aso.ibnuafdel.com';

  const lines = [
    '# Aso',
    '',
    '> The batteries-included Python web framework: FastAPI on the server, React on the client, Inertia in between.',
    '',
    '## Docs',
    '',
    ...entries.map((entry) => `- [${entry.data.title}](${base}${hrefFor(entry.id)}.md): ${entry.data.description}`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
