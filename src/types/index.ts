import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

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