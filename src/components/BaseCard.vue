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
						<p class="c-BaseCard__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint! Sed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessitatibus harum voluptate <a href="#">maiores</a> consequatur asperiores. Repudiandae delectus excepturi aperiam. Quod.</p>

						<h2 class="c-BaseCard__sectionTitle">This is a title</h2>
						<p class="c-BaseCard__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint! Sed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessitatibus harum voluptate <a href="#">maiores</a> consequatur asperiores. Repudiandae delectus excepturi aperiam. Quod.</p>
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
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../colors';

.c-BaseCard {
	display: flex;
	flex-direction: row;
	max-width: 800px;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0px 0px 50px -25px rgba(57,83,191,0.75);
	font-family: 'Open Sans', sans-serif;
	color: $un-gray3;

	a {
		color: $un-blue;
	}

	.is-disabled {
		opacity: 0.5;
		pointer-events: none;
		cursor: not-allowed;
	}

	&__main {
		display: flex;
		flex-direction: column;
		flex-basis: 72%;
		flex-grow: 1;
	}

	&__sidebar {
		flex-direction: column;
		padding: 2rem;
		box-sizing: border-box;
		flex-basis: 28%;
		background-color: $un-purple-lightest;
		display: none;

		&.is-active {
			display: flex;
		}
	}

	&__top,
	&__middle,
	&__bottom {
		padding: 2.5rem 4rem;
	}

	&__top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: flex-start;
		padding-bottom: 1.25rem;

		& + .c-BaseCard__middle {
			padding-top: 1.25rem;
		}
	}

	&__middle {
		&:nth-child(2) {
			padding-bottom: 1.25rem;
		}

		// Make a line between __middle blocks
		& + & {
			border-top: 1px solid $un-gray1;
		}
	}

	&__bottom {
		display: flex;
		flex-direction: row;
		padding-top: 1.25rem;

		.c-Button + .c-Button {
			margin-left: 1rem;
		}
	}

	&__feedback {
		padding: 1rem 4rem;
		text-align: center;
		font-size: 0.85rem;
		background-color: $un-gray1;
		color: $un-gray2-dark;

		&.is-negative {
			background-color: lighten($un-red-light, 12%);
			color: $un-red;
		}
	}

	&__title,
	&__subtitle,
	&__sectionTitle {
		margin: 0;
		padding-bottom: 0.5rem;
		font-family: 'Montserrat', serif;
		color: $un-purple;
		font-size: 1.5rem;
	}

	&__title {
		font-size: 2rem;
	}

	&__sectionTitle {
		padding-bottom: 0.15rem;
		font-size: 1.125rem;
	}

	&__text {
		margin: 0;
		margin-top: 0.5rem;
		line-height: 1.5rem;

		& + * {
			margin-top: 2.75rem;
		}
	}

	&__stepNumber {
		color: $un-purple;
		font-weight: 600;
		font-size: 1.2rem;
	}
}
</style>
