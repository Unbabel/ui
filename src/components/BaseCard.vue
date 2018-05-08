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
			</div>
		</slot>
		<slot name="sidebar">
			<div class="c-BaseCard__sidebar" :class="sidebarClasses">
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
			default: true,
		},
	},
	computed: {
		sidebarClasses() {
			let result = '';

			if (this.isSidebarVisible) {
				result += 'is-active';
			}

			return result;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../colors';

.c-BaseCard {
	display: flex;
	flex-direction: row;
	// TODO: change to 900px
	max-width: 800px;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0px 0px 50px -25px rgba(57,83,191,0.75);
	font-family: 'Open Sans', sans-serif;
	color: $un-gray3;

	a {
		color: $un-blue;
	}

	&__main {
		display: flex;
		flex-direction: column;
		flex-basis: 72%;
		flex-grow: 1;
	}

	&__sidebar {
		padding: 2rem;
		box-sizing: border-box;
		background-color: $un-purple-lighter;
		flex-basis: 28%;
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
	}

	&__middle {
		&:nth-child(2) {
			padding-top: 1.25rem;
		}

		&:nth-last-child(2) {
			padding-bottom: 1.25rem;
		}

		// Make a line between __middle blocks
		& + & {
			border-top: 1px solid $un-gray1;
		}
	}

	&__bottom {
		padding-top: 1.25rem;
	}

	&__sectionTitle,
	&__subtitle {
		margin: 0;
		padding-bottom: 0.5rem;
		font-family: 'Montserrat', serif;
		color: $un-purple;
		font-size: 1.5rem;
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
