<template>
	<div class="story-wrapper">
		<StoryViewer
			v-if="showStory"
			:story="currentStory"
			:storyIdx="storyIdx"
			@close="showStory = false"
			@scroll="scrollViewer"
		/>
		<ScrollBtn
			@scroll="scroll"
			:scrollLen="scrollLen"
			:storiesLen="stories.length"
		/>
		<div class="item-wrapper" :style="`transform: translateX(${scrollLen}px)`">
			<StoryItem
				v-for="item in stories"
				:key="item.name"
				:name="item.name"
				:image="item.image"
				:isRead="item.isRead"
				@viewStory="viewStory"
			/>
		</div>
	</div>
</template>

<script>
import ScrollBtn from './ScrollBtn.vue';
import StoryItem from './StoryItem.vue';
import StoryViewer from './StoryViewer.vue';
import stories from '@/assets/stories.json';

export default {
	components: {
		ScrollBtn,
		StoryItem,
		StoryViewer
	},
	data() {
		return {
			isRead: false,
			stories: stories,
			scrollLen: 0,
			currentStory: {},
			storyIdx: 0,
			showStory: false
		};
	},
	methods: {
		scroll(dir) {
			if (dir === 'right') {
				if (this.scrollLen > -75.2 * (this.stories.length - 5))
					this.scrollLen -= 310;
			} else {
				if (this.scrollLen < 0) this.scrollLen += 310;
				else this.scrollLen = 0;
			}
		},
		sortStory() {
			this.stories.sort((a, b) => {
				return a.name > b.name ? 1 : -1;
			});
			this.stories.sort((a, b) => {
				return a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1;
			});
		},
		updateReadState(idx) {
			const stories = this.stories[idx].stories;
			stories[this.storyIdx].isRead = true;
			for (let i = 0; i < stories.length; i++) if (!stories[i].isRead) return;
			this.stories[idx].isRead = true;
			this.sortStory();
		},
		scrollViewer(dir) {
			const idx = this.stories.findIndex(
				(e) => e.name === this.currentStory.name
			);
			if (dir === 'right') {
				if (this.storyIdx + 1 > this.currentStory.stories.length - 1) {
					if (idx + 1 === this.stories.length) return (this.showStory = false);
					this.currentStory = this.stories[idx + 1];
					this.storyIdx = 0;
					this.updateReadState(idx + 1);
					return;
				}
				this.storyIdx++;
				this.updateReadState(idx);
			} else {
				if (this.storyIdx === 0) {
					if (idx === 0) return (this.showStory = false);
					this.currentStory = this.stories[idx - 1];
					this.storyIdx = this.currentStory.stories.length - 1;
					return;
				}
				this.storyIdx--;
			}
		},
		viewStory(name) {
			const idx = this.stories.findIndex((e) => e.name === name);
			this.currentStory = this.stories[idx];
			this.showStory = true;
			for (let i = 0; i < this.currentStory.stories.length; i++) {
				if (!this.currentStory.stories[i].isRead) {
					this.storyIdx = i;
					this.updateReadState(idx);
					return;
				}
			}
			this.storyIdx = 0;
			this.updateReadState(idx);
		}
	},
	mounted() {
		this.sortStory();
	}
};
</script>

<style lang="scss">
.story-wrapper {
	width: 600px;
	height: 100px;
	border-radius: 2.5px;
	border: 1px solid #dbdbdb;
	background-color: #ffffff;
	overflow: hidden;
	position: relative;
}

.item-wrapper {
	height: 100%;
	display: flex;
	align-items: center;
	transition: 0.5s;
}
</style>
