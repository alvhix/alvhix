<template>
    <div class="tags">
        <Tags :tags="tags" @tag-selected="getPostsByTag" />
    </div>

    <hr />

    <ul class="slds-grid slds-wrap">
        <PostCard v-for="post in posts" :post="post" />
    </ul>
</template>
  
<script setup>
import { getCollection } from 'astro:content';
import Tags from './Tags.vue';
import PostCard from './PostCard.vue';
import { onMounted, ref } from 'vue';
import { sortByDescendingPubDate } from '../scripts/global';

const posts = ref([]);
const tags = ref([]);

onMounted(async () => {
    const fetchedPosts = await getCollection('blog', (post) => {
        return !post.data.draft;
    });
    posts.value = sortByDescendingPubDate(fetchedPosts);
    tags.value = [...new Set(posts.value.flatMap((post) => post.data.tags))];
});

const getPostsByTag = async (tag) => {
    const activeTags = retrieveActiveTags();

    const hasActiveTags = activeTags.length === 0;
    const result = hasActiveTags ?
        await getCollection('blog') :
        await getCollection('blog', ({ data }) => {
            return !data.draft &&
                activeTags.every(activeTag => data.tags.includes(activeTag));
        });

    posts.value = sortByDescendingPubDate([...result]);
};

const retrieveActiveTags = () => {
    const tags = document.querySelectorAll('div.tags>span');
    const activeTags = [];

    for (const span of tags) {
        if (span.classList.contains('slds-badge_inverse')) {
            activeTags.push(span.dataset.tag);
        }
    }

    return activeTags;
};

</script>
