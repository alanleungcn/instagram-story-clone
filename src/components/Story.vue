<template>
	<div class="story-wrapper">
		<ScrollBtn @scroll="scroll" />
		<div class="item-wrapper" :style="`transform: translateX(${scrollLen}px)`">
			<StoryItem
				v-for="item in stories"
				:key="item.name"
				:name="item.name"
				:image="item.image"
				:isRead="item.isRead"
			/>
		</div>
	</div>
</template>

<script>
import ScrollBtn from './ScrollBtn.vue';
import StoryItem from './StoryItem.vue';
import stories from '@/assets/stories.json';

export default {
	components: {
		ScrollBtn,
		StoryItem
	},
	data() {
		return {
			isRead: false,
			stories: stories,
			scrollLen: 0
		};
	},
	methods: {
		scroll(dir) {
			if (dir === 'right') this.scrollLen -= 300;
			else this.scrollLen += 300;
		}
	}
};
</script>

<style lang="scss">
.story-wrapper {
	position: relative;
	width: 600px;
	height: 100px;
	border-radius: 2.5px;
	border: 1px solid #dbdbdb;
	background-color: #ffffff;
	overflow: hidden;
}

.item-wrapper {
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0 5px 0 5px;
	transition: 0.5s ease;
}
</style>
