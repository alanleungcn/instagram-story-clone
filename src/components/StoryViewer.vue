<template>
	<div class="viewer-wrapper">
		<div class="close-btn" @click="$emit('close')">&times;</div>
		<div class="viewer-main-wrapper">
			<div class="scroll-btn" @click="$emit('scroll', 'left')">
				<font-awesome-icon
					icon="chevron-circle-left"
					size="lg"
				></font-awesome-icon>
			</div>
			<div class="img-wrapper">
				<div class="left" @click="$emit('scroll', 'left')"></div>
				<div class="right" @click="$emit('scroll', 'right')"></div>
				<div class="progress-wrapper">
					<div
						v-for="(story, idx) in story.stories"
						class="progress-item"
						:key="idx"
					>
						<div
							class="progress-bar"
							v-if="idx <= storyIdx"
							:style="idx === storyIdx ? `width: ${progress}%` : 'width: 100%'"
						></div>
					</div>
				</div>
				<div class="up-wrapper">
					<div class="info-wrapper">
						<img class="avatar" :src="story.image" />
						<div class="name">{{ story.name }}</div>
						<div class="time">{{ timeSince }}</div>
					</div>
					<div class="control-wrapper" @click="playPause()">
						<font-awesome-icon v-if="pause" icon="play" />
						<font-awesome-icon v-if="!pause" icon="pause" />
					</div>
				</div>
				<img :src="imageUrl" class="img" />
			</div>
			<div class="scroll-btn" @click="$emit('scroll', 'right')">
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
			time: 0,
			pause: false
		};
	},
	computed: {
		imageUrl() {
			return this.story.stories[this.storyIdx].image;
		},
		progress() {
			return (this.time / 5000) * 100;
		},
		timeSince() {
			const sec = Math.floor(
				(Date.now() - this.story.stories[this.storyIdx].time) / 1000
			);
			let interval = sec / (60 * 60 * 24 * 365);
			if (interval > 1) return Math.floor(interval) + 'yr';
			interval = sec / (60 * 60 * 24 * 30);
			if (interval > 1) return Math.floor(interval) + 'mo';
			interval = sec / (60 * 60 * 24);
			if (interval > 1) return Math.floor(interval) + 'd';
			interval = sec / (60 * 60);
			if (interval > 1) return Math.floor(interval) + 'h';
			interval = sec / 60;
			if (interval > 1) return Math.floor(interval) + 'm';
			return Math.floor(sec) + 's';
		}
	},
	methods: {
		startTimer() {
			this.interval = setInterval(() => {
				this.time += 10;
				if (this.time >= 5000) this.$emit('scroll', 'right');
			}, 10);
		},
		playPause() {
			this.pause = !this.pause;
			if (this.pause) clearInterval(this.interval);
			else this.startTimer();
		},
		resetTimer() {
			this.time = 0;
			this.pause = false;
			clearInterval(this.interval);
			this.startTimer();
		}
	},
	mounted() {
		this.startTimer();
	},
	beforeDestroy() {
		clearInterval(this.interval);
	},
	watch: {
		storyIdx() {
			this.resetTimer();
		},
		story: {
			handler() {
				this.resetTimer();
			},
			deep: true
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
	top: 0;
	left: 0;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	position: fixed;
	background-color: #1a1a1a;
}

.viewer-main-wrapper {
	@include center;
	gap: 10px;
}

.scroll-btn {
	cursor: pointer;
	color: #3a3a3a;
	&:hover {
		color: #dbdbdb;
	}
}

.left {
	left: 0;
	width: 50%;
	height: 100%;
	z-index: 9999;
	position: absolute;
}

.right {
	right: 0;
	width: 50%;
	height: 100%;
	z-index: 9999;
	position: absolute;
}

.close-btn {
	@include center;
	top: 10px;
	right: 10px;
	width: 50px;
	height: 50px;
	font-size: 50px;
	position: fixed;
	cursor: pointer;
	color: #ffffff;
	user-select: none;
}

.img-wrapper {
	@include center;
	user-select: none;
	position: relative;
	&:after {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		content: '';
		position: absolute;
		border-radius: 10px;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.5) 0%,
			rgba(0, 0, 0, 0) 15%,
			rgba(0, 0, 0, 0) 85%,
			rgba(0, 0, 0, 0.5) 100%
		);
	}
}

.progress-wrapper {
	top: 20px;
	width: 100%;
	display: flex;
	position: absolute;
}

.progress-item {
	flex: 1;
	height: 2.5px;
	z-index: 9999;
	border-radius: 5px;
	position: relative;
	margin: 0 1px 0 1px;
	background-color: rgba(200, 200, 200, 0.5);
	&:first-child {
		margin-left: 15px;
	}
	&:last-child {
		margin-right: 15px;
	}
}

.progress-bar {
	height: 100%;
	max-width: 100%;
	border-radius: 5px;
	position: absolute;
	background-color: #ffffff;
}

.up-wrapper {
	top: 35px;
	width: 100%;
	z-index: 9999;
	display: flex;
	position: absolute;
	align-items: center;
	justify-content: space-between;
}

.info-wrapper {
	gap: 10px;
	display: flex;
	margin-left: 20px;
	align-items: center;
}

.control-wrapper {
	cursor: pointer;
	color: #ffffff;
	margin-right: 20px;
}

.avatar {
	width: 30px;
	height: 30px;
	border-radius: 100%;
}

.name {
	color: #ffffff;
	font-size: 17.5px;
}

.time {
	font-size: 15px;
	color: #c8c8c8;
}

.img {
	height: 95vh;
	border-radius: 10px;
	width: calc(95vh * (9 / 16));
}
</style>
