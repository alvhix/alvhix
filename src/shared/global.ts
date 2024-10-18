import { getCollection } from 'astro:content';
import type { Post } from './types';

export function sortByDescendingPubDate(posts: Post[]): Post[] {
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export async function getPostsUndrafted(): Promise<Post[]> {
  return await getCollection('blog', ({ data }) => {
    return !data.draft;
  });
}

export async function getPostsUndraftedByActiveTags(
  activeTags: string[]
): Promise<Post[]> {
  return await getCollection('blog', ({ data }) => {
    return (
      !data.draft &&
      activeTags.every((activeTag) => data.tags.includes(activeTag))
    );
  });
}