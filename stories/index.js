import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/vue';
// import { withNotes } from '@storybook/addon-notes';

import Button from '../src/components/Button.vue';
import TopBar from '../src/components/TopBar.vue';
import LoadingScreen from '../src/components/LoadingScreen.vue';
import ToggleGroup from '../src/components/ToggleGroup.vue';
import Timer from '../src/components/Timer.vue';
import StarGroupWithStuff from './examples/StarGroupWithStuff.vue';
import ModalExample from './examples/ModalExample.vue';
import ModalWithForm from './examples/ModalWithForm.vue';
import ModalWithLongText from './examples/ModalWithLongText.vue';
import ModalWithInfo from './examples/ModalWithInfo.vue';
import TopBarWithStuff from './examples/TopBarWithStuff.vue';
import SidebarWithTabs from './examples/SidebarWithTabs.vue';

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		const content = text('Button text', 'Click me');
		const link = text('Button link', '');
		const kind = select('Kind', { primary: 'Primary', cta: 'Call to Action', secondary: 'secondary' }, 'Primary');
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
	});

storiesOf('Modal', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		const title = text('Modal title', 'This is the title!');
		const overlay = boolean('Dark overlay', true);

		return {
			components: {
				ModalExample,
			},
			template: `<modal-example title="${title}" :show-overlay="${overlay}"></modal-example>`,
		};
	})
	.add('With Form', () => {
		const title = text('Modal title', 'This is the title!');

		return {
			components: {
				ModalWithForm,
			},
			template: `<modal-with-form title="${title}"></modal-with-form>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	})
	.add('Long text', () => {
		const title = text('Modal title', 'This is a lot of text');

		return {
			components: {
				ModalWithLongText,
			},
			template: `<modal-with-long-text title="${title}"></modal-with-long-text>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
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
							label: 'BB',
							isActive: true,
							isHidden: false,
						},
						{
							id: 'gah',
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
			template: '<toggle-group :toggles="toggles" :has-toggle-all="true" @clicked-on-item="toggleItem" @clicked-on-all="toggleAll" style="max-width: 2.5rem;"></toggle-group>',
		};
	});

storiesOf('Timer', module)
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
