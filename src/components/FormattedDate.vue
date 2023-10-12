<template>
	<time :datetime="formattedDate">
		{{ formattedDate }}
	</time>
</template>
  
<script setup>
import { computed } from 'vue'

const { date } = defineProps({ date: { type: Date, required: true } })

const formattedDate = computed(() => {
	if (date) {
		const options = { year: 'numeric', month: 'short', day: 'numeric' }
		return date.toLocaleDateString('en-US', options)
	} else {
		return ''
	}
});
</script>