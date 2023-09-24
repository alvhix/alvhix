<template>
    <li class="slds-col slds-size_1-of-1 slds-p-bottom_x-small">
        <div class="slds-box">
            <a :href="`/blog/${post.slug}/`" class="slds-text-link_reset">
                <img :src=post.data.heroImage class="heroImage" :alt=post.slug />
                <hr />
                <Tile :title=post.data.title :description=post.data.description :pubDate=post.data.pubDate
                    :tags=post.data.tags />
            </a>
        </div>
    </li>
</template>

<script setup>
import Tile from './Tile.vue';

const { post } = defineProps(['post']);
</script>

<style scoped>
.slds-box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition:
        box-shadow 0.3s ease,
        transform 0.3s ease,
        border 0.3s ease;
}

.slds-box:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
    border: 1px solid rgba(0, 0, 0, 0.2);
    transition-delay: 0.1s;
}
</style>
