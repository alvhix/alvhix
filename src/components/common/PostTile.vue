<template>
  <div class="slds-tile">
    <h3
      v-if="title"
      class="slds-tile__title slds-text-heading_medium slds-m-bottom_x-small slds-truncate"
      :title="title"
    >
      {{ title }}
    </h3>
    <h4
      v-if="description"
      class="slds-tile__title slds-text-title slds-m-bottom_medium slds-truncate"
      :title="description"
    >
      {{ description }}
    </h4>
    <div class="slds-tile__detail">
      <dl
        class="slds-list_horizontal slds-grid_vertical-align-center slds-wrap"
      >
        <template v-if="pubDate">
          <dt
            class="slds-item_label slds-text-color_weak slds-truncate"
            title="Created"
          >
            Created:
          </dt>
          <dd class="slds-item_detail slds-truncate" title="Created at">
            <span class="date">
              <time :datetime="pubDate?.toISOString()">{{
                formatDate(pubDate)
              }}</time>
            </span>
          </dd>
        </template>
        <template v-if="updatedDate">
          <dt
            class="slds-item_label slds-text-color_weak slds-truncate"
            title="Updated"
          >
            Updated:
          </dt>
          <dd class="slds-item_detail slds-truncate" title="Updated at">
            <span class="date">
              <time :datetime="updatedDate?.toISOString()">{{
                formatDate(updatedDate)
              }}</time>
            </span>
          </dd>
        </template>
        <template v-if="tags">
          <dt
            class="slds-item_label slds-text-color_weak slds-truncate"
            title="Tags"
          >
            Tags:
          </dt>
          <dd class="slds-item_detail slds-truncate" title="Tags">
            <span
              class="slds-listbox__option-text slds-listbox__option-text_entity"
            >
              <span v-for="tag in tags" :key="tag" class="slds-badge">
                #{{ tag }}
              </span>
            </span>
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/formatDate';

const { title, description, pubDate, updatedDate, tags } = defineProps({
  title: String,
  description: String,
  pubDate: Date,
  updatedDate: Date,
  tags: Array,
});
</script>

<style scoped>
dt,
dd {
  font-size: 0.75rem;
}

.slds-badge {
  padding: 0.1rem 0.4rem;
}
</style>
