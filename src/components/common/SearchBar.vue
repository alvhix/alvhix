<template>
  <div :class="`slds-form-element device-type-${props.deviceType}`">
    <div class="slds-form-element__control">
      <div class="slds-combobox_container">
        <div
          class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"
          :class="{ 'slds-is-open': results.length }"
        >
          <div
            class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right"
            role="none"
          >
            <input
              type="text"
              class="slds-input slds-combobox__input"
              aria-autocomplete="list"
              aria-controls="listbox-id-1"
              aria-expanded="false"
              aria-haspopup="listbox"
              autocomplete="off"
              role="combobox"
              @input="handleSearch"
              @focusin="handleSearch"
              @mousedown="closeSearch"
              @blur="closeSearch"
            />
            <span
              class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right"
            >
              <slot name="search-icon" />
            </span>
          </div>
          <div
            v-if="props.dropdownEnabled"
            class="slds-dropdown slds-dropdown_length-with-icon-3 slds-dropdown_fluid"
            role="listbox"
            tabindex="0"
            aria-busy="false"
          >
            <ul class="slds-listbox slds-listbox_vertical" role="presentation">
              <li
                v-for="result in results"
                :key="result.id"
                role="presentation"
                class="slds-listbox__item"
              >
                <a
                  :href="`/blog/${result.slug}/`"
                  class="slds-text-link_reset"
                  data-result-item
                >
                  <div
                    :id="result.id"
                    class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta"
                    role="option"
                  >
                    <span class="slds-media__figure slds-listbox__option-icon">
                      <span class="slds-icon_container slds-icon-standard-post">
                        <slot name="post-icon" />
                      </span>
                    </span>
                    <span class="slds-media__body">
                      <article class="slds-tile">
                        <h3
                          class="slds-tile__title slds-truncate"
                          :title="result.data.title"
                        >
                          {{ result.data.title }}
                        </h3>
                        <span
                          class="slds-listbox__option-meta slds-listbox__option-meta_entity"
                        >
                          <FormattedDate :date="result.data.pubDate" />
                        </span>
                      </article>
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormattedDate from '@components/common/FormattedDate.vue';
import Fuse from 'fuse.js';
import { ref } from 'vue';
import { getPostsUndrafted, sortByDescendingPubDate } from '@scripts/global';
import { DeviceType, type Post } from '@/scripts/types';

const props = defineProps<{
  deviceType: DeviceType;
  dropdownEnabled: boolean;
}>();

const maxNumberOfResults: number = 5;
const fuseOptions: object = {
  minMatchCharLength: 2,
  threshold: 0.5,
  keys: ['data.title', 'body'],
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // location: 0,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
};
const posts = sortByDescendingPubDate(await getPostsUndrafted());
const fuse: Fuse<Post> = new Fuse(posts, fuseOptions);
const results = ref<Post[]>([]);

const handleSearch = (event: Event) => {
  const inputElement: HTMLInputElement = <HTMLInputElement>event.target;
  results.value = query(inputElement.value);
};

const closeSearch = (event: Event) => {
  const mouseEvent: MouseEvent = <MouseEvent>event;
  const relatedTarget: HTMLElement = <HTMLElement>mouseEvent?.relatedTarget;

  if (relatedTarget && relatedTarget.matches('a[data-result-item]')) {
    return;
  }

  results.value = [];
};

const query = (searchPattern: string) => {
  return fuse
    .search(searchPattern)
    .map((result) => result.item)
    .slice(0, maxNumberOfResults);
};
</script>

<style scoped>
.device-type-desktop {
  min-width: 240px;
}

.device-type-mobile {
  min-width: 100%;
}
</style>
