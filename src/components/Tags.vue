<template>
    <span v-for="tag in tags" :key="tag" :data-tag=tag @click="filterPostsByTag"
        :class="['slds-badge', 'slds-m-right_x-small', 'slds-m-bottom_xx-small', { 'slds-badge_inverse': isActiveTag(tag) }]">
        #{{ tag }}
    </span>
</template>

<script setup lang="ts">
import { retrieveActiveTags } from '../scripts/global';


const { tags } = defineProps({
    tags: {
        required: true
    }
});

const emit = defineEmits(['tag-selected']);

const filterPostsByTag = (event: any) => {
    const tagNode = event.target;
    const tag = tagNode.dataset.tag;

    toggleTagStyle(tagNode);
    toggleActiveTag(tag);
    emit('tag-selected', tag);
};

const isActiveTag = (tag: string) => {
    const activeTags = retrieveActiveTags();
    if (activeTags.includes(tag)) {
        return true;
    }

    return false;
};

const toggleTagStyle = (tagNode: HTMLElement) => {
    tagNode.classList.toggle('slds-badge_inverse');
};

const toggleActiveTag = (activeTag: string) => {
    let activeTags = retrieveActiveTags();

    if (activeTags.includes(activeTag)) {
        activeTags = activeTags.filter((e) => e !== activeTag);
    } else {
        activeTags.push(activeTag);
    }

    sessionStorage.setItem('activeTags', JSON.stringify(activeTags));
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