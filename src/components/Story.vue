<template>
	<div class="story-wrapper">
		<StoryViewer
			v-if="showViewer"
			:storyIdx="storyIdx"
			:story="currentStory"
			@scroll="scrollViewer"
			@close="showViewer = false"
		/>
		<ScrollBtn
			@scroll="scrollItem"
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
			storyIdx: 0,
			scrollLen: 0,
			isRead: false,
			showViewer: false,
			readState: false,
			currentStory: {},
			stories: stories
		};
	},
	methods: {
		scrollItem(dir) {
			if (dir === 'right') {
				if (this.scrollLen > -77.5 * (this.stories.length - 7))
					this.scrollLen -= 77.5 * 5;
			} else if (this.scrollLen < 0) this.scrollLen += 77.5 * 5;
		},
		updateReadState(idx) {
			const stories = this.stories[idx].stories;
			stories[this.storyIdx].isRead = true;
			for (let i = 0; i < stories.length; i++) if (!stories[i].isRead) return;
			this.stories[idx].isRead = true;
		},
		scrollViewer(dir) {
			const idx = this.stories.findIndex(
				(e) => e.name === this.currentStory.name
			);
			if (dir === 'right') {
				if (this.storyIdx + 1 === this.currentStory.stories.length) {
					if (
						idx + 1 === this.stories.length ||
						this.stories[idx + 1].isRead !== this.readState
					)
						return (this.showViewer = false);
					/* console.log(this.stories[idx]);
					if (this.stories[idx]) console.log('close viewer'); */
					this.storyIdx = 0;
					this.updateReadState(idx + 1);
					this.currentStory = this.stories[idx + 1];
					return;
				}
				this.storyIdx++;
				this.updateReadState(idx);
			} else {
				if (this.storyIdx === 0) {
					this.currentStory = this.stories[idx - 1];
					if (this.stories[idx - 1].isRead)
						this.storyIdx = this.currentStory.stories.length - 1;
					else this.viewStory(this.stories[idx - 1].name);
					this.updateReadState(idx - 1);
					return;
				}
				this.storyIdx--;
			}
		},
		viewStory(name) {
			const idx = this.stories.findIndex((e) => e.name === name);
			this.currentStory = this.stories[idx];
			this.showViewer = true;
			for (let i = 0; i < this.currentStory.stories.length; i++) {
				if (!this.currentStory.stories[i].isRead) {
					this.storyIdx = i;
					this.readState = false;
					this.updateReadState(idx);
					return;
				}
			}
			this.storyIdx = 0;
			this.readState = true;
			this.updateReadState(idx);
		},
		sortStory() {
			this.stories.sort((a, b) => {
				return a.name > b.name ? 1 : -1;
			});
			this.stories.sort((a, b) => {
				return a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1;
			});
		}
	},
	mounted() {
		this.sortStory();
	},
	watch: {
		showViewer(val) {
			if (!val) this.sortStory();
		}
	}
};
</script>

<style lang="scss">
.story-wrapper {
	width: 600px;
	height: 100px;
	overflow: hidden;
	position: relative;
	border-radius: 2.5px;
	border: 1px solid #dbdbdb;
	background-color: #ffffff;
}

.item-wrapper {
	height: 100%;
	display: flex;
	transition: 0.5s;
	align-items: center;
}
</style>
