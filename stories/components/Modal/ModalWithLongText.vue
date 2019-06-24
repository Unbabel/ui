<template>
	<div>
		<btn kind="primary" @click="toggleModal">Open Modal with long text</btn>

		<modal :active="modalIsActive" :title="title" :aria-description="contentReference" defaultStyles>
			<div slot="content" :id="contentReference">
				<p tabindex="-1">This is just a demonstration. If it were a real application, it would provide a message telling whether the entered address is valid. For demonstration purposes, this dialog has a lot of text.</p>
				<p>Lorem ipsum dolor amet vegan locavore forage art party plaid glossier. Affogato raw denim XOXO succulents, synth thundercats listicle activated charcoal subway tile woke pinterest authentic williamsburg paleo retro. Banh mi cornhole butcher godard, dreamcatcher succulents coloring book mustache. Live-edge heirloom selvage skateboard dreamcatcher taxidermy irony kombucha vinyl jianbing. You probably haven't heard of them twee kombucha aesthetic semiotics DIY plaid squid. Venmo single-origin coffee swag master cleanse taxidermy man bun ramps. Four dollar toast man bun prism vaporware pour-over affogato craft beer vice tattooed edison bulb letterpress la croix.</p>
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
			contentReference: 'modalContent',
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
		top: {
			type: Number,
			required: false,
			default: 40,
		},
	},
	methods: {
		toggleModal() {
			this.modalIsActive = !this.modalIsActive;
		},
	}
}
</script>

<style lang="scss" scoped>
</style>
