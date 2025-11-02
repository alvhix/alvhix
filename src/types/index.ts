import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// Serialized version for client-side hydration
export type SerializedPost = {
  id: string;
  slug: string;
  body: string;
  collection: 'blog';
  data: {
    title: string;
    description: string;
    pubDate: string;
    updatedDate?: string;
    heroImage?: string;
    tags: string[];
    draft?: boolean;
  };
};

export enum DeviceType {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

export enum IconType {
  STANDARD = 'standard',
  UTILITY = 'utility',
}

export enum IconSize {
  XX_SMALL = 'xx-small',
  X_SMALL = 'x-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}