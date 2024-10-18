<template>
  <div class="tags">
    <Tags :tags="tags" @tag-selected="getPostsByActiveTags" />
  </div>

  <hr />

  <ul class="slds-grid slds-wrap">
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </ul>
</template>

<script setup lang="ts">
import Tags from './PostTags.vue';
import PostCard from './PostCard.vue';
import { onMounted, ref } from 'vue';
import {
  getPostsUndrafted,
  getPostsUndraftedByActiveTags,
  sortByDescendingPubDate,
} from '../shared/global';
import type { Post } from '@/shared/types';

const posts = ref<Post[]>([]);
const tags = ref<string[]>([]);

onMounted(async () => {
  const fetchedPosts = await getPostsUndrafted();
  tags.value = Array.from(
    new Set(fetchedPosts.map((post) => post.data.tags).flat())
  );
});

const getPostsByActiveTags = async (activeTags: string[]) => {
  const hasActiveTags = activeTags.length === 0;
  const result = hasActiveTags
    ? await getPostsUndrafted()
    : await getPostsUndraftedByActiveTags(activeTags);

  posts.value = sortByDescendingPubDate([...result]);
};
</script>
