<template>
	<div class="c-Sidebar">
		<div class="c-Sidebar__item" v-bind:class="{ 'is-active': activeTab === index}"
			v-for="(tab, index) in tabs" :key="index">
			<div class="c-Sidebar__tab" v-on:click="clickedOnTab(index)">
				<span v-show="activeTab === index" class="c-Sidebar__tab__icon">-</span>
				<span class="c-Sidebar__tab__icon" v-show="activeTab !== index">+</span> {{ tab }}
			</div>
			<div class="c-Sidebar__panel">
				<slot :name="tab"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		tabs: {
			type: Array,
			default: () => {
				return [];
			},
		},
		activeTab: {
			type: Number,
			required: false,
			default: 0,
		},
		side: {
			type: String,
			required: false,
			default: 'left',
		},
	},
	methods: {
		clickedOnTab(index) {
			// eslint-disable-next-line
			console.log('fire an event! clicked on a tab!');
			this.$emit('clicked-on-tab', index, this.side);
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/Sidebar.scss';
</style>

<style lang="scss">
@import '../variables';

.c-Sidebar {
	// Basic styles for the inside of the Panel
	&__block {
		padding: 1.2rem 0.9rem;
		font-size: 0.9rem;
		color: $un-gray4-light;

		&--bottomBorder {
			border-bottom: 1px solid $un-gray1;
		}
	}

	&__subtitle,
	&__text {
		margin: 0;
	}

	&__subtitle {
		margin-bottom: 0.8rem;
		font-family: $un-font-heading;
		font-weight: bold;
	}

	&__text {
		+ .c-Sidebar__subtitle {
			margin-top: 2rem;
		}
	}
}
</style>
