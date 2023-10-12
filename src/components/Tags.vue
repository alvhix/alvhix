<template>
    <span v-for="tag in tags" :key="tag" :data-tag=tag @click="toggleTag"
        :class="['slds-badge', 'slds-m-right_x-small', 'slds-m-bottom_xx-small', { 'slds-badge_inverse': isActiveTag(tag) }]">
        #{{ tag }}
    </span>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const { tags } = defineProps({ tags: { type: Array, required: true } });

const activeTags = ref<string[]>([]);

onMounted(() => {
    const newActiveTags = sessionStorage.getItem('activeTags');
    activeTags.value = newActiveTags ? JSON.parse(newActiveTags) : [];
    emit('tag-selected', activeTags.value);
});

onUnmounted(() => {
    sessionStorage.setItem('activeTags', JSON.stringify(activeTags.value));
});

const emit = defineEmits(['tag-selected']);

const isActiveTag = (tag: string) => activeTags.value.includes(tag);

const toggleTag = (event: any) => {
    const tagNode = event.target;
    const tag = tagNode.dataset.tag;

    toggleActiveTag(tag);
    emit('tag-selected', activeTags.value);
};

const toggleActiveTag = (activeTag: string) => {
    if (activeTags.value.includes(activeTag)) {
        const index = activeTags.value.indexOf(activeTag);
        activeTags.value.splice(index, 1);
    } else {
        activeTags.value.push(activeTag);
    }
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