import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import Button from '../src/components/Button.vue';
import TopBar from '../src/components/TopBar.vue';
import LoadingScreen from '../src/components/LoadingScreen.vue';
import Timer from '../src/components/Timer.vue';
import ToggleGroup from '../src/components/ToggleGroup.vue';
import StarGroup from '../src/components/StarGroup.vue';
import StarGroupWithStuff from './examples/StarGroupWithStuff.vue';
import Modal from '../src/components/Modal.vue';
import ModalWithForm from './examples/ModalWithForm.vue';
import ModalWithLongText from './examples/ModalWithLongText.vue';
import ModalWithInfo from './examples/ModalWithInfo.vue';
import TopBarWithStuff from './examples/TopBarWithStuff.vue';
import SidebarWithTabs from './examples/SidebarWithTabs.vue';
import BaseCard from '../src/components/BaseCard.vue';

storiesOf('Button', module)
	.add('Usage', withInfo({
		summary: `This is basic button: you click it and stuff happens. Hopefully.<br>
			Besides its default state, it has 3 visual variations. It can also be disabled.`,
	})(() => {
		const content = text('Button text', 'Click me');
		const link = text('Button link', '');
		const kind = select('Kind', {
			primary: 'Primary',
			secondary: 'secondary',
			cta: 'Call to Action',
			ctaAlt: 'Call to Action (Alternative)',
		}, 'primary');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'${kind}'" :click-handler="log" :disabled="${isDisabled}" :link="'${link}'">${content}</btn>`,
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		const content = text('Button text', 'Click me');
		const link = text('Button link', '');
		const kind = select('Kind', {
			primary: 'Primary',
			secondary: 'secondary',
			cta: 'Call to Action',
			ctaAlt: 'Call to Action (Alternative)',
		}, 'primary');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'${kind}'" :click-handler="log" :disabled="${isDisabled}" :link="'${link}'">${content}</btn>`,
			methods: {
				log: action('clicked the default button'),
			},
		};
	})
	.add('Primary', () => {
		const content = text('Button text', 'Primary action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'primary'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the primary button'),
			},
		};
	})
	.add('Secondary', () => {
		const content = text('Button text', 'Secondary action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'secondary'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the secondary button'),
			},
		};
	})
	.add('Call to action', () => {
		const content = text('Button text', 'Call to action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'cta'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the CTA button'),
			},
		};
	})
	.add('Call to action - Alt', () => {
		const content = text('Button text', 'Call to action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'ctaAlt'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the CTA button'),
			},
		};
	});

storiesOf('Modal', module)
	.add('Usage', withInfo({
		summary: `The simplest Modal shows a message and a button for user acknowledgement.<br>
			It also supports longer texts that trigger scrollbars, having a close button on the corner and having a form inside. You can put whatever elements you want on the bottom. By default it has the least destructive option selected (in this examples' case, the Cancel button).
		`,
		propTables: [
			Modal,
		],
	})(() => {
		return {
			data: () => {
				return {
					isModalActive: false,
				};
			},
			components: {
				Modal,
				btn: Button,
			},
			methods: {
				openModal() {
					this.isModalActive = true;
				},
				closeModal() {
					this.isModalActive = false;
				},
			},
			propsDescription: {
				closeOnEscapePress: 'Close the modal on ESC key press',
			},
			template: `<div>
	<a @click="openModal">Open Modal</a>
	<modal :active="isModalActive" :title="title" :show-overlay="showOverlay">
		<p slot="content">This is the <strong>main</strong> text.</p>
		<div slot="footer">
			<btn kind="secondary" :click-handler="closeModal">Close</btn>
			<btn kind="primary">Send</btn>
		</div>
	</modal>
</div>`,
		};
	}))
	.add('With Form', () => {
		const title = text('Modal title', 'This is the title!');

		return {
			components: {
				ModalWithForm,
			},
			template: `<modal-with-form title="${title}"></modal-with-form>`,
		};
	})
	.add('Long text', () => {
		const title = text('Modal title', 'This is a lot of text');

		return {
			components: {
				ModalWithLongText,
			},
			template: `<modal-with-long-text title="${title}"></modal-with-long-text>`,
		};
	})
	.add('Info Modal', () => {
		const title = text('Modal title', 'Some info below');

		return {
			components: {
				ModalWithInfo,
			},
			template: `<modal-with-info title="${title}"></modal-with-info>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	});

storiesOf('TopBar', module)
	.add('Usage', withInfo({
		summary: `A basic TopBar with three areas.
		`,
	})(() => {
		return {
			components: {
				TopBar,
			},
			template: '<top-bar></top-bar>',
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		const container = number('Container width', null);

		return {
			components: {
				TopBar,
			},
			template: `<top-bar container-width="${container}"></top-bar>`,
		};
	})
	.add('With stuff', () => {
		return {
			components: {
				TopBarWithStuff,
			},
			template: '<top-bar-with-stuff></top-bar-with-stuff>',
		};
	});

storiesOf('Sidebar', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		// const container = number('Container width', null);

		return {
			components: {
				SidebarWithTabs,
			},
			template: '<sidebar-with-tabs></sidebar-with-tabs>',
		};
	});

storiesOf('Star Group', module)
	.add('Usage', withInfo({
		summary: `A group of stars used to rate something. You can customize the number of stars and its minimum value.<br>The group itself doesn't store its value, it emits an event when the user clicks and receives the value it should show.
		`,
	})(() => {
		return {
			components: {
				StarGroup,
			},
			template: '<star-group :stars="5" :min-value="0"></star-group>',
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			components: {
				StarGroupWithStuff,
			},
			template: '<star-group-with-stuff></star-group-with-stuff>',
		};
	});

storiesOf('Loading Screen', module)
	.add('Usage', withInfo({
		summary: `A small popup while something loads. It only has a message a spinner.
		`,
	})(() => {
		return {
			components: {
				LoadingScreen,
			},
			template: '<loading-screen></loading-screen>',
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			components: {
				LoadingScreen,
			},
			template: '<loading-screen :active="true" :overlay="true"></loading-screen>',
		};
	})
	.add('Long message', () => {
		return {
			components: {
				LoadingScreen,
			},
			template: '<loading-screen :active="true" message="This is a longer message, that might cause a line break"></loading-screen>',
		};
	});

storiesOf('Toggle Group', module)
	.add('Usage', withInfo({
		summary: 'A group of toggles, usually used to control the visibility of something.<br> Toggles are passed in an Array, and each Toggle should have an id, a name, a label, a "isActive" property and a "hidden" property.<br> There is an optional toggle that lets the user toggle everything at once.',
	})(() => {
		return {
			components: {
				ToggleGroup,
			},
			template: '<toggle-group></toggle-group>',
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			components: {
				ToggleGroup,
			},
			data: () => {
				return {
					toggles: [
						{
							id: 'beep',
							name: 'Beep',
							label: 'BB',
							isActive: true,
							isHidden: false,
						},
						{
							id: 'gah',
							name: 'Good Game',
							label: 'GG',
							isActive: false,
							isHidden: false,
						},
					],
				};
			},
			methods: {
				toggleItem(clickedItem) {
					this.toggles.map((item) => {
						if (item.id === clickedItem.id) {
							Object.assign(item, {
								isActive: !item.isActive,
							});
						}
						return true;
					});
				},
				toggleAll(state) {
					this.toggles.map((item) => {
						Object.assign(item, {
							isActive: state,
						});
						return true;
					});
				},
			},
			template: '<toggle-group :toggles="toggles" :has-toggle-all="true" tooltip-side="right" @clicked-on-item="toggleItem" @clicked-on-all="toggleAll" style="max-width: 2.5rem;"></toggle-group>',
		};
	});

storiesOf('Timer', module)
	.add('Usage', withInfo({
		summary: 'A easy and (slightly) customizable way to show time.<br>The limit property accepts the number of seconds that must pass before an event is emited.',
	})(() => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
				};
			},
			methods: {
				startTimer() {
					this.$refs.timer.start();
				},
				pauseTimer() {
					this.$refs.timer.pause();
				},
				resetTimer() {
					this.$refs.timer.reset();
				},
			},
			template: `<div>
	<button v-on:click="startTimer">Start</button>
	<button v-on:click="pauseTimer">Stop</button>
	<button v-on:click="resetTimer">Reset</button>
	<timer ref="timer" :options="timerOptions"></timer>
</div>`,
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
				};
			},
			methods: {
				startTimer() {
					this.$refs.timer.start();
				},
				pauseTimer() {
					this.$refs.timer.pause();
				},
				resetTimer() {
					this.$refs.timer.reset();
				},
			},
			template: '<div><button v-on:click="startTimer">Start</button><button v-on:click="pauseTimer">Stop</button><button v-on:click="resetTimer">Reset</button><timer ref="timer" :options="timerOptions"></timer></div>',
		};
	})
	.add('Auto start', () => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
				};
			},
			methods: {
				startTimer() {
					this.$refs.timer.start();
				},
				pauseTimer() {
					this.$refs.timer.pause();
				},
				resetTimer() {
					this.$refs.timer.reset();
				},
			},
			template: '<div><button v-on:click="startTimer">Start</button><button v-on:click="pauseTimer">Stop</button><button v-on:click="resetTimer">Reset</button><timer ref="timer" :options="timerOptions" :auto-start="true"></timer></div>',
		};
	})
	.add('With a limit', () => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
					limit: 3,
					passedLimit: false,
				};
			},
			methods: {
				startTimer() {
					this.$refs.timer.start();
				},
				pauseTimer() {
					this.$refs.timer.pause();
				},
				resetTimer() {
					this.$refs.timer.reset();
				},
			},
			template: '<div><button v-on:click="startTimer">Start</button><button v-on:click="pauseTimer">Stop</button><button v-on:click="resetTimer">Reset</button><timer ref="timer" :auto-start="true" :limit="limit" @passed-limit="passedLimit = true"></timer><p v-show="passedLimit">You passed the {{ limit }} second limit!</p></div>',
		};
	})
	.add('Always show the hours', () => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
				};
			},
			methods: {
				startTimer() {
					this.$refs.timer.start();
				},
				pauseTimer() {
					this.$refs.timer.pause();
				},
				resetTimer() {
					this.$refs.timer.reset();
				},
			},
			template: '<div><button v-on:click="startTimer">Start</button><button v-on:click="pauseTimer">Stop</button><button v-on:click="resetTimer">Reset</button><timer ref="timer" :auto-start="true" :always-show-hours="true"></timer></div>',
		};
	});

storiesOf('Card', module)
	.add('Usage', withInfo({
		summary: 'A basic card with three slots (top, middle and bottom)',
	})(() => {
		return {
			components: {
				BaseCard,
			},
			data: () => {
				return {
				};
			},
			methods: {
			},
			template: '<baseCard></baseCard>',
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			components: {
				BaseCard,
			},
			data: () => {
				return {
				};
			},
			methods: {
			},
			template: '<baseCard :is-sidebar-visible="true"></baseCard>',
		};
	})
	.add('With error', () => {
		const feedback = '<strong>This</strong> is the feedback!';

		return {
			components: {
				BaseCard,
			},
			data: () => {
				return {
				};
			},
			methods: {
			},
			template: `<baseCard feedback="${feedback}"></baseCard>`,
		};
	});
