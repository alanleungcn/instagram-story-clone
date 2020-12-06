<template>
	<div class="story-wrapper">
		<StoryViewer
			v-if="showStory"
			:stories="stories"
			:userIdx="userIdx"
			:storyIdx="storyIdx"
			@close="showStory = false"
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
			showStory: false,
			userIdx: 0,
			storyIdx: 0
		};
	},
	methods: {
		scroll(dir) {
			if (dir === 'right') {
				if (this.scrollLen > -77.5 * (this.stories.length - 5))
					this.scrollLen -= 310;
			} else {
				if (this.scrollLen < 0) this.scrollLen += 310;
				else this.scrollLen = 0;
			}
		},
		viewStory(name) {
			const idx = stories.findIndex((e) => e.name === name);
			this.userIdx = idx;
			this.showStory = true;
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
