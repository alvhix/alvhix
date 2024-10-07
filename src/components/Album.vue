<template>
  <div class="tags">
    <Tags :tags="tags" @tag-selected="getPostsByActiveTags" />
  </div>

  <hr />

  <ul class="slds-grid slds-wrap">
    <PostCard v-for="post in posts" :post="post" />
  </ul>
</template>

<script setup lang="ts">
import Tags from "./Tags.vue";
import PostCard from "./PostCard.vue";
import { onMounted, ref } from "vue";
import {
  getPostsUndrafted,
  getPostsUndraftedByActiveTags,
  sortByDescendingPubDate,
} from "../scripts/global";

const posts = ref<any[]>([]);
const tags = ref<string[]>([]);

onMounted(async () => {
  const fetchedPosts = await getPostsUndrafted();
  tags.value = Array.from(
    new Set(fetchedPosts.map((post) => post.data.tags).flat()),
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
