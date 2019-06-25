<template>
	<div>
		<btn kind="primary" @click="toggleModal">Open Modal</btn>

		<modal :active="modalIsActive" :title="title" :aria-description="ariaDescription" defaultStyles>
			<div slot="content" :id="ariaDescription">
				<p v-bind="autofocus">For demonstration purposes, this dialog has a lot of text. <b>Accessibility:</b> We can make *any* element automatically focused for text-reader purposes by adding the attribute <em>data-autofocus</em>.</p>
				<p>Affogato raw denim XOXO succulents, synth thundercats listicle activated charcoal subway tile woke pinterest authentic williamsburg paleo retro. Banh mi cornhole butcher godard, dreamcatcher succulents coloring book mustache. Live-edge heirloom selvage skateboard dreamcatcher taxidermy irony kombucha vinyl jianbing. You probably haven't heard of them twee kombucha aesthetic semiotics DIY plaid squid. Venmo single-origin coffee swag master cleanse taxidermy man bun ramps. Four dollar toast man bun prism vaporware pour-over affogato craft beer vice tattooed edison bulb letterpress la croix.</p>
				<p>Freegan unicorn taxidermy paleo literally knausgaard gentrify crucifix. Hammock vice single-origin coffee, pok pok chillwave direct trade glossier keytar cold-pressed actually. La croix coloring book iPhone semiotics, af mumblecore meggings craft beer pinterest austin banjo brunch. Fixie thundercats umami waistcoat. Mumblecore adaptogen pug ugh snackwave, cardigan PBR&B readymade kogi yr bespoke VHS cloud bread brooklyn.</p>
						
			</div>
			<div slot="footer">
				<btn @click="toggleModal">Close</btn>
				<btn kind="primary">Send</btn>
			</div>
		</modal>
	</div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import Button from '@/components/Button.vue';

export default {
	data() {
		return {
			modalIsActive: false,
			ariaDescription: 'modalContent',
		}
	},
	components: {
		modal: Modal,
		btn: Button,
	},
	props: {
		title: {
			type: String,
			required: true,
			default: 'Default title',
		},
		shouldAutofocus: {
			type: Boolean,
			required: false,
			default: false,
		}
	},
	methods: {
		toggleModal() {
			this.modalIsActive = !this.modalIsActive;
		},
	},
	computed: {
		autofocus() {
			return this.shouldAutofocus
				?
				{
					'data-autofocus': true,
					'tabindex': '-1',
				}
				:
				{}
		},
	}
}
</script>

<style lang="scss" scoped>
</style>
