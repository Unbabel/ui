<template>
	<div class="c-BaseCard">
		<slot name="main">
			<div class="c-BaseCard__main">
				<slot name="top">
					<div class="c-BaseCard__top">
						<span>logo</span>
						<span class="c-BaseCard__stepNumber">3 / 4</span>
					</div>
				</slot>

				<slot name="middle">
					<div class="c-BaseCard__middle">
						<h2 class="c-BaseCard__subtitle">This is a title</h2>
						<p class="c-BaseCard__text">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint!
							Sed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessita
							tibus harum voluptate <a href="#">maiores</a> consequatur asperiores.
							Repudiandae delectus excepturi aperiam. Quod.
						</p>

						<h2 class="c-BaseCard__sectionTitle">This is a title</h2>
						<p class="c-BaseCard__text">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint!
							Sed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessita
							tibus harum voluptate <a href="#">maiores</a> consequatur asperiores.
							Repudiandae delectus excepturi aperiam. Quod.
						</p>
					</div>
				</slot>

				<slot name="bottom">
					<div class="c-BaseCard__bottom">
						bottom
					</div>
				</slot>
				<slot name="feedback">
					<div v-show="feedback.length" class="c-BaseCard__feedback" v-html="feedback">
						This is feedback!
					</div>
				</slot>
			</div>
		</slot>
		<slot name="sidebar" :class="sidebarClasses">
			<div class="c-BaseCard__sidebar">
				sidebar
			</div>
		</slot>
	</div>
</template>

<script>
export default {
	name: 'BaseCard',
	data() {
		return {};
	},
	props: {
		isSidebarVisible: {
			type: Boolean,
			required: false,
			default: false,
		},
		feedback: {
			type: String,
			required: false,
			default: '',
		},
	},
	computed: {
		sidebarClasses() {
			return {
				'is-active': this.isSidebarVisible,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/BaseCard.scss';
</style>
