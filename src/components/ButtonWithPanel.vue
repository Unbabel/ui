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
	data() {
		return {
			panelOpen: false,
			openLocation: 'bottom',
		};
	},
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
			if (clickedOutside && this.closeOnOutsideClick) {
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

<style lang="scss" src="./styles/ButtonWithPanel.scss" scoped></style>
