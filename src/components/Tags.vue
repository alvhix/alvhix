<template>
    <span v-for="tag in tags" :data-tag=tag @click="filterPostsByTag"
        class="slds-badge slds-m-right_x-small slds-m-bottom_x-small">#{{ tag
        }}</span>
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

    toggleSelection(tagNode);
    emit('tag-selected', tag);
};

const toggleSelection = (tagNode) => {
    tagNode.classList.toggle('slds-badge_inverse');
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

.slds-badge+.slds-badge {
    margin-left: 0;
}
</style>