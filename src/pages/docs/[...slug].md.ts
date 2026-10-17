import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const entries = await getCollection('docs');
  // The root entry (id "index") is served by ../docs.md.ts instead: an empty rest param
  // here would write to "docs/.md" on disk, not "docs.md".
  return entries
    .filter((entry) => entry.id !== 'index')
    .map((entry) => ({ params: { slug: entry.id.replace(/\/index$/, '') }, props: { entry } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof getCollection>>[number] };
  const front = [
    '---',
    `title: ${entry.data.title}`,
    `description: ${entry.data.description}`,
    '---',
    '',
  ].join('\n');

  return new Response(front + entry.body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
