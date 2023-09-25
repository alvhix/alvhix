<template>
    <span v-for="tag in tags" :data-tag=tag @click="filterPostsByTag" class="slds-badge">#{{ tag }}</span>
</template>

<script setup>
const { tags } = defineProps({
    tags: {
        required: true
    }
});
const emit = defineEmits(['tag-selected']);

const filterPostsByTag = (event) => {
    const tagNode = event.target;
    const tag = tagNode.dataset.tag;

    triggerSelection(tagNode);
    emit('tag-selected', tag);
};

const triggerSelection = (tagNode) => {
    const hasInverseClass = tagNode.className.includes('slds-badge_inverse');
    tagNode.className = hasInverseClass ? 'slds-badge' : 'slds-badge slds-badge_inverse';
};
</script>


<style scoped>
span.slds-badge {
    cursor: pointer;
    border: 1px dashed black;
}

span.slds-badge.slds-badge_inverse {
    border: 1px dashed white;
}
</style>