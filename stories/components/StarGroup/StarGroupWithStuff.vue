<template>
	<star-group :stars="stars" :value="value" @changed-value="changeValue" :click-to-remove="true" :min-value="1"></star-group>
</template>

<script>
import StarGroup from '@/components/StarGroup.vue';

export default {
	components: {
		StarGroup,
	},
	data: () => {
		return {
			stars: 5,
			value: null,
		};
	},
	methods: {
		changeValue(newValue) {
			this.value = newValue;
		},
	},
}
</script>

<style lang="scss" scoped>
</style>
