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
				<div class="progress-wrapper">
					<div
						v-for="(story, idx) in story.stories"
						class="progress-item"
						:key="idx"
					></div>
				</div>
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
		story: Object,
		storyIdx: Number
	},
	computed: {
		storyImg() {
			return this.story.stories[this.storyIdx].image;
		}
		/* userStoryLen() {
			return this.stories[this.userIdx].stories.length;
		} */
	},
	mounted() {
		console.log(this.story.stories[this.storyIdx]);
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
	position: relative;
	user-select: none;
}

.progress-wrapper {
	position: absolute;
	top: 20px;
	display: flex;
	width: 100%;
}

.progress-item {
	flex: 1;
	height: 2.5px;
	border-radius: 5px;
	margin: 0 1px 0 1px;
	background-color: rgba(200, 200, 200, 0.5);
	&:first-child {
		margin-left: 20px;
	}
	&:last-child {
		margin-right: 20px;
	}
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
