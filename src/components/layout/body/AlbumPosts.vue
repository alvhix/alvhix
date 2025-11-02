<template>
  <div>
    <div class="tags">
      <AlbumTags :tags="tags" @tag-selected="onTagSelected" />
    </div>

    <hr />

    <ul class="slds-grid slds-wrap">
      <PostCard v-for="post in visiblePosts" :key="post.id" :post="post" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AlbumTags from '@components/common/AlbumTags.vue';
import PostCard from '@components/common/PostCard.vue';
import type { Post } from '@/types';

const props = defineProps<{
  posts: Post[];
}>();
const tags = computed(
  () => Array.from(new Set(props.posts.flatMap((p) => p.data.tags))) as string[]
);

const activeTags = ref<string[]>([]);

const visiblePosts = computed(() => {
  if (!activeTags.value.length) return props.posts;
  return props.posts.filter((post) =>
    activeTags.value.every((t) => post.data.tags.includes(t))
  );
});

function onTagSelected(tags: string[]) {
  activeTags.value = [...tags];
}
</script>

<style scoped>
.tags {
  margin-bottom: 0.5rem;
}
</style>
