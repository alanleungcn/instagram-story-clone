<template>
	<div class="story-wrapper">
		<StoryViewer
			v-if="showStory"
			:story="currentStory"
			:storyIdx="storyIdx"
			@close="showStory = false"
			@scroll="scrollStory"
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
		scrollStory(dir) {
			console.log(dir);
			if (dir === 'right') {
				if (this.storyIdx + 1 > this.currentStory.stories.length - 1) {
					const idx = this.stories.findIndex(
						(e) => e.name === this.currentStory.name
					);
					if (idx + 1 === this.stories.length) return (this.showStory = false);
					this.currentStory = this.stories[idx + 1];
					this.storyIdx = 0;
					return;
				}
				this.storyIdx++;
			} else {
				if (this.storyIdx === 0) {
					const idx = this.stories.findIndex(
						(e) => e.name === this.currentStory.name
					);
					if (idx === 0) return (this.showStory = false);
					this.currentStory = this.stories[idx - 1];
					this.storyIdx = this.currentStory.stories.length - 1;
					return;
				}
				this.storyIdx--;
			}
		},
		viewStory(name) {
			this.currentStory = this.stories.find((e) => e.name === name);
			this.showStory = true;
			const story = this.currentStory.stories;
			for (let i = 0; i < story.length; i++)
				if (!story[i].isRead) return (this.storyIdx = i);
			console.log(this.storyIdx);
			this.storyIdx = 0;
			console.log(this.storyIdx);
		}
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
	padding: 0 5px 0 5px;
	transition: 0.5s;
}
</style>
