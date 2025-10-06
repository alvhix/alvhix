import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '../types';

const isDevelopment = import.meta.env.DEV;

/**
 * Sorts posts by their publication date in descending order
 * @param posts Array of blog posts
 * @returns Sorted array of posts with most recent first
 */
export function sortByDescendingPubDate(posts: Post[]): Post[] {
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

/**
 * Gets all non-draft posts (or all posts in development mode)
 * @returns Array of posts
 */
export async function getPostsUndrafted(): Promise<Post[]> {
  return await getCollection('blog', ({ data }: CollectionEntry<'blog'>) => {
    return isDevelopment ? true : !data.draft;
  });
}

/**
 * Gets all non-draft posts that contain all the specified tags
 * @param activeTags Array of tag strings to filter by
 * @returns Filtered array of posts
 */
export async function getPostsUndraftedByActiveTags(
  activeTags: string[]
): Promise<Post[]> {
  return await getCollection('blog', ({ data }: CollectionEntry<'blog'>) => {
    return (
      (isDevelopment ? true : !data.draft) &&
      activeTags.every((activeTag) => data.tags.includes(activeTag))
    );
  });
}