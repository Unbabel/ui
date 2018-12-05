<template>
	<div
		class="c-ButtonWithPanel"
		:class="classObject">
		<Button :kind="kind" :size="size"><slot /></Button>
		<Button
			:kind="kind"
			:size="size"
			class="c-ButtonWithPanel__toggle"
			:class="toggleButtonClassObject"
			@click="togglePanel" title="Toggle Panel">
				<svg width="15" height="10" xmlns="http://www.w3.org/2000/svg">
					<path d="M.25 2.12l6.59 7.49a.64.64 0 0 0 .92 0l6.6-7.49a.6.6 0 0 0-.07-.84L13.18.34a.62.62 0 0 0-.87.07l-4.9 5.67a.15.15 0 0 1-.22 0L2.29.41A.61.61 0 0 0 1.87.2a.6.6 0 0 0-.45.14l-1.1.94a.6.6 0 0 0-.07.84z" fill-rule="evenodd"/>
				</svg>
			</button>
		<transition name="panelVisible">
			<div
				v-show="panelOpen"
				class="c-ButtonPanel">
				<slot name="panel" />
			</div>
		</transition>
	</div>
</template>

<script>
import SizeMixin from '../mixins/SizeMixin';
import ButtonKindMixin from '../mixins/ButtonKindMixin';
import Button from './Button.vue';
import OptionsList, {
	OptionsListItem,
} from './OptionsList.vue';

export default {
	name: 'ButtonWithPanel',
	mixins: [
		SizeMixin,
		ButtonKindMixin,
	],
	components: {
		Button,
		OptionsList,
		OptionsListItem,
	},
	data: () => ({
		panelOpen: false,
	}),
	computed: {
		classObject() {
			return {
				'is-active': this.panelOpen,
			};
		},
		toggleButtonClassObject() {
			return {
				'is-active': this.panelOpen,
			};
		},
	},
	methods: {
		togglePanel() {
			this.panelOpen = !this.panelOpen;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../variables';

.c-ButtonWithPanel {
	display: inline-flex;
	position: relative;

	.c-Button {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	&__toggle.c-Button {
		border-left: none;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
		border-top-right-radius: $un-control-radius;
		border-bottom-right-radius: $un-control-radius;
		margin-left: -1px;
		padding-left: 14px;
		padding-right: 14px;

		path {
			fill: #fff;
		}
	}
	&.is-active &__toggle {
		svg {
			transform: rotate(180deg);
		}
	}

	.c-ButtonPanel {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 4px;
	}
}
.c-ButtonPanel {
	background-color: #fff;
	border: 1px solid #D0D4DA;
	--optionsListBorderColor: #{$un-gray1-dark};
	border-radius: $un-control-radius;
}

.panelVisible-enter-active,
.panelVisible-leave-active {
  transition: opacity .5s;
}
.panelVisible-enter,
.panelVisible-leave-to {
  opacity: 0;
}
</style>
