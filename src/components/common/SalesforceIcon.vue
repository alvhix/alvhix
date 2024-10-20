<template>
  <svg
    :class="`slds-icon slds-icon_${size} ${colored ? 'slds-icon-text-default' : ''}`"
    aria-hidden="true"
  >
    <title>{{ `${icon} ${type} icon` }}</title>
    <use :xlink:href="`/svg/${type}.svg#${icon}`"></use>
  </svg>
  <span class="slds-assistive-text">{{ icon + ' icon' }}</span>
</template>

<script setup lang="ts">
import type { IconSize, IconType } from '@/scripts/types';
import { defineProps } from 'vue';

defineProps<{
  icon: string;
  type: IconType;
  size: IconSize;
  colored?: boolean;
}>();
</script>
