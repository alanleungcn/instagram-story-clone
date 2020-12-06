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
			<img
				:src="storyImg"
				width="419"
				height="745"
				style="border-radius: 10px"
			/>
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
		stories: Array,
		userIdx: Number,
		storyIdx: Number
	},
	computed: {
		storyImg() {
			const user = this.stories[this.userIdx];
			return user.stories[this.storyIdx];
		},
		userStoryLen() {
			return this.stories[this.userIdx].stories.length;
		}
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

.img {
	width: 420;
	height: 720;
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
