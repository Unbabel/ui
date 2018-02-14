<template>
	<div>
		<sidebar :tabs="tabs" :slotNames="slotNames" :active-tab="activeTab" @clicked-on-tab="changeActiveTab">
			<p slot="beep">this is the content for the info</p>
			<p slot="double">this is the content for the annotations</p>
		</sidebar>
	</div>
</template>

<script>
import Sidebar from '../../src/components/Sidebar.vue';

export default {
	components: {
		Sidebar,
	},
	data: () => {
		return {
			activeTab: 0,
		};
	},
	props: {
		tabs: {
			type: Array,
			default: () => {
				return ['info', 'annotations'];
			},
		},
		slotNames: {
			type: Array,
			default: () => {
				return ['beep', 'double'];
			},
		},
	},
	methods: {
		changeActiveTab(index) {
			this.activeTab = index;
		}
	}
}
</script>

<style lang="scss" scoped>
.c-Sidebar {
	min-height: 100vh;

	p {
		margin-left: 1rem;
	}
}
</style>