<template>
	<time :datetime="formattedDate">
		{{ formattedDate }}
	</time>
</template>
  
<script setup>
import { computed } from 'vue'

const props = defineProps({
	date: Date
})

const formattedDate = computed(() => {
	if (props.date) {
		const options = { year: 'numeric', month: 'short', day: 'numeric' }
		return props.date.toLocaleDateString('en-US', options)
	} else {
		return ''
	}
})
</script>