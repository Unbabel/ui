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
import {
	debounce,
	getEventPath,
} from '../utilities';

const calculateOpenPosition = debounce(function() {
	const {
		$el: element,
	} = this;
	const {
		innerHeight: windowHeight,
		scrollY,
	} = window;
	const {
		offsetHeight,
		offsetTop,
	} = element;
	const spaceToTop = offsetTop - scrollY;
	const spaceToBottom = windowHeight - (spaceToTop + offsetHeight);
	this.openLocation = spaceToTop > spaceToBottom ? 'top' : 'bottom';
}, 100);


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
	props: {
		closeOnEscapePress: {
			type: Boolean,
			required: false,
			default: true,
		},
		closeOnOutsideClick: {
			type: Boolean,
			required: false,
			default: true,
		},
		autoPanelPosition: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	data: () => ({
		panelOpen: false,
		openLocation: 'bottom',
	}),
	computed: {
		classObject() {
			return {
				'is-active': this.panelOpen,
				[`open-${this.openLocation}`]: true,
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
		handleKeyPress(event) {
			const clickedEscKey = event.keyCode === 27;
			if (clickedEscKey && this.closeOnEscapePress) {
				this.panelOpen = false;
			}
		},
		handleClick(event) {
			const eventPath = getEventPath(event);
			const clickedOutside = eventPath.indexOf(this.$el) === -1;
			if (clickedOutside) {
				this.panelOpen = false;
			}
		},
		calculateOpenPosition,
		bindWatchForOpenSpace() {
			window.addEventListener('resize', this.calculateOpenPosition, true);
			window.addEventListener('scroll', this.calculateOpenPosition, true);
		},
		unbindWatchForOpenSpace() {
			window.removeEventListener('resize', this.calculateOpenPosition, true);
			window.removeEventListener('scroll', this.calculateOpenPosition, true);
		},
	},
	watch: {
		panelOpen(panelOpen) {
			if (panelOpen) {
				document.addEventListener('keydown', this.handleKeyPress, true);
				document.addEventListener('click', this.handleClick, true);
			} else {
				document.removeEventListener('keydown', this.handleKeyPress, true);
				document.removeEventListener('click', this.handleClick, true);
			}
		},
	},
	mounted() {
		if (this.autoPanelPosition) {
			this.bindWatchForOpenSpace();
		}
	},
	beforeDestroy() {
		if (this.autoPanelPosition) {
			this.unbindWatchForOpenSpace();
		}
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
		border-left: 1px solid rgba(0,0,0,0.1);

		path {
			fill: #fff;
		}
	}

	// Toggle
	&.open-top &__toggle,
	&.open-bottom.is-active &__toggle {
		svg {
			transform: rotate(180deg);
		}
	}
	&.open-top.is-active &__toggle,
	&.open-bottom &__toggle {
		svg {
			transform: rotate(0);
		}
	}

	// Panel
	.c-ButtonPanel {
		position: absolute;
		left: 0;
		right: 0;
	}
	&.open-top .c-ButtonPanel {
		bottom: 100%;
		margin-bottom: 4px;
	}
	&.open-bottom .c-ButtonPanel {
		top: 100%;
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
	transition: 0.15s ease-out;
	opacity: 1;
	transform: translateY(0) scale(1);
	transition-property: opacity, transform;

	.open-top & {
		transform-origin: right bottom;
	}
	.open-bottom & {
		transform-origin: right top;
	}
}
.panelVisible-enter,
.panelVisible-leave-to {
	opacity: 0;
	--positionOffset: 10;
	--scaleFactor: 0.9;

	.open-top & {
		transform: translateY(calc(var(--positionOffset) * 1px)) scale(var(--scaleFactor));
	}
	.open-bottom & {
		transform: translateY(calc(var(--positionOffset) * -1px)) scale(var(--scaleFactor));
	}
}
</style>
