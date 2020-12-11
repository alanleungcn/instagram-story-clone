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
				<div class="up-wrapper">
					<div class="info-wrapper">
						<img :src="story.image" class="avatar" />
						<div class="name">{{ story.name }}</div>
						<div class="time">{{ timeSince }}</div>
					</div>
					<div class="control-wrapper" @click="playPause()">
						<font-awesome-icon v-if="pause" icon="play" />
						<font-awesome-icon v-if="!pause" icon="pause" />
					</div>
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
			time: 0,
			pause: false
		};
	},
	computed: {
		storyImg() {
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
				if (this.time >= 5000) this.scroll('right');
			}, 10);
		},
		scroll(dir) {
			this.$emit('scroll', dir);
			console.log('scroll');
		},
		playPause() {
			this.pause = !this.pause;
			if (this.pause) clearInterval(this.interval);
			else this.startTimer();
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
			this.time = 0;
			this.pause = false;
			clearInterval(this.interval);
			this.startTimer();
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
			rgba(0, 0, 0, 0) 15%,
			rgba(0, 0, 0, 0) 85%,
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

.up-wrapper {
	position: absolute;
	display: flex;
	width: 100%;
	top: 35px;
	align-items: center;
	justify-content: space-between;
	z-index: 1;
}

.info-wrapper {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-left: 20px;
}

.control-wrapper {
	cursor: pointer;
	color: #ffffff;
	margin-right: 20px;
}

.avatar {
	border-radius: 100%;
	width: 30px;
	height: 30px;
}

.name {
	font-size: 17.5px;
	color: #ffffff;
}

.time {
	font-size: 15px;
	color: rgb(200, 200, 200);
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
