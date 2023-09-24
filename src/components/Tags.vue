<template>
    <button v-for="tag in tags" class="slds-button">
        <span :data-tag=tag @click="filterPostsByTag" class="slds-badge">#{{ tag }}</span>
    </button>
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
button {
    border-radius: var(--slds-c-badge-radius-border, var(--sds-c-badge-radius-border, 15rem))
}
</style>