<template>
	<div class="app">
		<Story />
	</div>
</template>

<script>
import Story from '@/components/Story.vue';

export default {
	components: {
		Story
	}
};
</script>

<style lang="scss">
html,
body {
	margin: 0;
	width: 100%;
	height: 100%;
	font-family: 'Montserrat', sans-serif;
}

.app {
	gap: 25px;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	background-color: #fafafa;
}
</style>
