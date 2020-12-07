<template>
	<div class="viewer-wrapper">
		<div class="close-btn" @click="$emit('close')">&times;</div>
		<div class="main-wrapper">
			<div class="scroll-btn">
				<font-awesome-icon
					icon="chevron-circle-left"
					size="lg"
				></font-awesome-icon>
			</div>
			<div class="img-wrapper">
				<img :src="storyImg" class="img" />
			</div>
			<div class="scroll-btn">
				<font-awesome-icon
					icon="chevron-circle-right"
					size="lg"
				></font-awesome-icon>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		story: Object
	},
	computed: {
		storyImg() {
			const stories = this.story.stories;
			for (const i in stories) if (!stories[i].isRead) return stories[i].image;
			return stories[0].image;
		}
		/* userStoryLen() {
			return this.stories[this.userIdx].stories.length;
		} */
	}
};
</script>

<style lang="scss" scoped>
@mixin center {
	display: flex;
	align-items: center;
	justify-content: center;
}

.viewer-wrapper {
	@include center;
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: #1a1a1a;
	top: 0;
	left: 0;
	margin: 0;
	padding: 0;
	z-index: 9999;
}

.main-wrapper {
	@include center;
	gap: 10px;
}

.img-wrapper {
	@include center;
	/* height: 100%; */
}

.img {
	width: 30vw;
	height: 95vh;
	border-radius: 10px;
}

.scroll-btn {
	color: #3a3a3a;
	cursor: pointer;
	&:hover {
		color: #dbdbdb;
	}
}

.close-btn {
	@include center;
	position: fixed;
	font-size: 50px;
	width: 50px;
	height: 50px;
	right: 10px;
	top: 10px;
	color: #ffffff;
	cursor: pointer;
}
</style>
