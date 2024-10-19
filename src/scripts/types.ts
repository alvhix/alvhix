import type { InferEntrySchema } from 'astro:content';

export interface Post {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: InferEntrySchema<'blog'>;
}
