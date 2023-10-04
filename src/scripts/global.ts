import { getCollection } from 'astro:content';

function sortByDescendingPubDate(posts: any[]): any[] {
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

async function getAllPosts(): Promise<any[]> {
  return await getCollection('blog');
}

async function getPostsUndrafted(): Promise<any[]> {
  return await getCollection('blog', (post: { data: any }) => {
    return !post.data.draft;
  });
}

async function getPostsUndraftedByActiveTags(
  activeTags: string[]
): Promise<any[]> {
  return await getCollection('blog', ({ data }: { data: any }) => {
    return (
      !data.draft &&
      activeTags.every((activeTag) => data.tags.includes(activeTag))
    );
  });
}

export {
  sortByDescendingPubDate,
  getAllPosts,
  getPostsUndrafted,
  getPostsUndraftedByActiveTags,
};
