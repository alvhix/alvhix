import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '../types';

/**
 * Gets all non-draft posts sorted by publication date (most recent first)
 * @returns Array of posts sorted by descending publication date
 */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    ({ data }: CollectionEntry<'blog'>) => !data.draft
  );

  return posts.sort(
    (a: { data: { pubDate: number; }; }, b: { data: { pubDate: number; }; }) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}
