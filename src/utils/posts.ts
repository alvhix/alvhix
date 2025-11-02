import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '../types';

const isDevelopment = import.meta.env.DEV;

/**
 * Gets all non-draft posts
 * @returns Array of posts
 */
// Simple module-level cache to avoid repeated getCollection calls during a build.
// In development we bypass the cache to reflect content changes instantly.
let cachedPosts: Post[] | null = null;
let loadingPromise: Promise<Post[]> | null = null;

export async function getAllPosts(): Promise<Post[]> {
  if (isDevelopment) {
    return await getCollection(
      'blog',
      ({ data }: CollectionEntry<'blog'>) => !data.draft
    );
  }

  if (cachedPosts) {
    // Return a shallow copy to avoid accidental external mutation, sorted
    return sortByDescendingPubDate([...cachedPosts]);
  }

  if (!loadingPromise) {
    loadingPromise = getCollection(
      'blog',
      ({ data }: CollectionEntry<'blog'>) => !data.draft
    )
      .then((posts: Post[]) => {
        cachedPosts = posts;
        return posts;
      })
      .catch((err: unknown) => {
        loadingPromise = null;
        throw err;
      });
  }

  const posts: Post[] = await loadingPromise!;
  return sortByDescendingPubDate([...posts]);
}

/**
 * Sorts posts by their publication date in descending order
 * @param posts Array of blog posts
 * @returns Sorted array of posts with most recent first
 */
function sortByDescendingPubDate(posts: Post[]): Post[] {
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}
