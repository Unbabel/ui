<template>
	<div class="c-Sidebar">
		<div class="c-Sidebar__item" v-bind:class="{ 'is-active': activeTab === index}" v-for="(tab, index) in tabs" :key="index">
			<div class="c-Sidebar__tab" v-on:click="clickedOnTab(index)">
				<span class="c-Sidebar__tab__icon" v-show="activeTab === index">-</span><span class="c-Sidebar__tab__icon" v-show="activeTab !== index">+</span> {{ tab }}
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
}
</script>

<style lang="scss" scoped>
@import '../variables';

.c-Sidebar {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 256px;
	color: $un-gray4;
	background-color: #FAFAFA;
	border-right: 1px solid $un-gray1;

	&__tab {
		padding: 1rem;
		font-family: 'Montserrat', sans-serif;
		font-weight: bold;
		text-align: left;
		font-size: 0.93rem;
		color: $un-gray2;
		border-bottom: 1px solid $un-gray1;
		z-index: 1;
		cursor: pointer;

		transition: all 0.2s ease-in-out;

		&__icon {
			display: inline-block;
			width: 11px;
		}

		&:hover {
			color: $un-gray4;
		}
	}

	&__panel {
		display: inline-block;
		position: absolute;
		top: 51px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		overflow-y: scroll;
	}

	&__item {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow-y: hidden;
		font-family: 'Open Sans', sans-serif;

		transition: 0.5s ease-in-out;

		&.is-active {
			flex-grow: 1;

			.c-Sidebar__tab {
				color: $un-gray4;
				background-color: $un-gray1-light;
			}

			& + .c-Sidebar__item .c-Sidebar__tab {
				border-top: 1px solid $un-gray1;
			}
		}
	}

	&:last-child {
		border-right: none;
		border-left: 1px solid $un-gray1;
	}

	// show borders on wide-screens
	@media screen and (min-width: 1280px) {
		border-left: 1px solid $un-gray1;

		&:last-child {
			border-right: 1px solid $un-gray1;
		}
	}
}
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
