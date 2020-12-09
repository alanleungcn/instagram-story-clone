<template>
	<div class="viewer-wrapper">
		<div class="close-btn" @click="$emit('close')">&times;</div>
		<div class="main-wrapper">
			<div class="scroll-btn" @click="scroll('left')">
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
					>
						<div
							v-if="idx <= storyIdx"
							class="progress-bar"
							:style="idx === storyIdx ? `width: ${progress}%` : 'width: 100%'"
						></div>
					</div>
				</div>
				<div class="info-wrapper">
					<img :src="story.image" class="avatar" />
					<div class="info">{{ story.name }}</div>
				</div>
				<img :src="storyImg" class="img" />
			</div>
			<div class="scroll-btn" @click="scroll('right')">
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
	data() {
		return {
			time: 0
		};
	},
	computed: {
		storyImg() {
			return this.story.stories[this.storyIdx].image;
		},
		progress() {
			return (this.time / 5000) * 100;
		}
	},
	methods: {
		startTimer() {
			const start = Date.now();
			this.interval = setInterval(() => {
				this.time = Date.now() - start;
				//if (this.time >= 5000) this.scroll('right');
			}, 1);
		},
		scroll(dir) {
			this.$emit('scroll', dir);
			this.time = 0;
			clearInterval(this.interval);
			this.startTimer();
		}
	},
	mounted() {
		this.startTimer();
		console.log(this.story);
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
	position: relative;
	user-select: none;
	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.5) 0%,
			rgba(0, 0, 0, 0) 20%,
			rgba(0, 0, 0, 0) 90%,
			rgba(0, 0, 0, 0.5) 100%
		);
		border-radius: 10px;
	}
}

.progress-wrapper {
	position: absolute;
	top: 20px;
	display: flex;
	width: 100%;
}

.progress-item {
	position: relative;
	flex: 1;
	height: 2.5px;
	border-radius: 5px;
	margin: 0 1px 0 1px;
	background-color: rgba(200, 200, 200, 0.5);
	&:first-child {
		margin-left: 15px;
	}
	&:last-child {
		margin-right: 15px;
	}
	z-index: 1;
	border-radius: 5px;
}

.progress-bar {
	height: 100%;
	position: absolute;
	background-color: #ffffff;
	border-radius: 5px;
	max-width: 100%;
}

.info-wrapper {
	position: absolute;
	display: flex;
	width: 100%;
	top: 35px;
	align-items: center;
	z-index: 1;
	gap: 10px;
	left: 15px;
}

.avatar {
	border-radius: 100%;
	width: 30px;
	height: 30px;
}

.info {
	font-size: 17.5px;
	color: #ffffff;
}

.img {
	width: calc(95vh * (9 / 16));
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
	user-select: none;
}
</style>
