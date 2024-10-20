import type { InferEntrySchema } from 'astro:content';

export interface Post {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: InferEntrySchema<'blog'>;
}

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
