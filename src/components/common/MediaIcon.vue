<template>
  <span class="slds-icon">
    <img :src="`/svg/${name}`" width="100%" height="100%" :alt="react.title" />
    <span class="slds-assistive-text">{{ react.title }}</span>
  </span>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue';
const props = defineProps<{
  name: string;
}>();

const react = reactive({
  title: props.name.replace('.svg', '') + ' icon',
});
</script>
