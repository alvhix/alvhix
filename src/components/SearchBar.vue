<template>
    <div class="slds-form-element">
        <div class="slds-form-element__control">
            <div class="slds-combobox_container">
                <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"
                    :class="{ 'slds-is-open': results.length }">
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                        <input type="text" @input="handleSearch" @focusin="handleSearch" @focusout="closeSearch"
                            class="slds-input slds-combobox__input" aria-autocomplete="list" aria-controls="listbox-id-1"
                            aria-expanded="false" aria-haspopup="listbox" autocomplete="off" role="combobox" />
                        <span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
                            <slot name="search"></slot>
                        </span>
                    </div>
                    <div class="slds-dropdown slds-dropdown_length-with-icon-3 slds-dropdown_fluid" role="listbox"
                        aria-label="{{Placeholder for Dropdown Items}}" tabindex="0" aria-busy="false">
                        <ul class="slds-listbox slds-listbox_vertical" role="presentation">
                            <li v-for="result in results" data-search-item role="presentation" class="slds-listbox__item">
                                <div id="option229"
                                    class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta"
                                    role="option">
                                    <span class="slds-media__figure slds-listbox__option-icon">
                                        <span class="slds-icon_container slds-icon-standard-post">
                                            <slot name="post"></slot>
                                        </span>
                                    </span>
                                    <span class="slds-media__body">
                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">
                                            {{ result.data.title }}
                                        </span>
                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">
                                            {{ result.data.pubDate }}
                                        </span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCollection } from 'astro:content';
import Fuse from 'fuse.js';
import { ref } from 'vue'

const maxNumberOfResults = 3;
const fuseOptions = {
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
const posts = (await getCollection('blog')).sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
);
const fuse = new Fuse(posts, fuseOptions);
const results: any = ref([]);

function handleSearch(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    results.value = query(inputElement.value);
    console.log(results.value);
}

function closeSearch(event: Event) {
    results.value = [];
}

function query(searchPattern: string): {}[] {
    return fuse
        .search(searchPattern)
        .map((result) => result.item)
        .slice(0, maxNumberOfResults);
}

</script>