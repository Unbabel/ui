<template>
	<div>
		<sidebar :tabs="tabs" :slotNames="slotNames" :active-tab="activeTab" @clicked-on-tab="changeActiveTab">
			<div slot="info" class="c-Sidebar__block c-Sidebar__block--bottomBorder">
				<p class="c-Sidebar__subtitle">Subtitle</p>
				<p class="c-Sidebar__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis vitae dicta alias perspiciatis totam quae natus tenetur recusandae, debitis error optio inventore eum quibusdam. Ab quo necessitatibus quaerat deserunt rerum.</p>
			</div>
			<p slot="annotations">this is the content for the annotations</p>
		</sidebar>
	</div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

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
}
</style>
