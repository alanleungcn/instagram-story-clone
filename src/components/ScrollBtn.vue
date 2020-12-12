<template>
	<div class="scroll-wrapper">
		<div class="scroll-btn" @click="$emit('scroll', 'left')">
			<font-awesome-icon
				v-if="scrollLen < 0"
				icon="chevron-circle-left"
				size="lg"
			></font-awesome-icon>
		</div>
		<div
			v-if="scrollLen > -77.5 * (storiesLen - 5)"
			class="scroll-btn"
			@click="$emit('scroll', 'right')"
		>
			<font-awesome-icon
				icon="chevron-circle-right"
				size="lg"
			></font-awesome-icon>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		scrollLen: Number,
		storiesLen: Number
	}
};
</script>

<style lang="scss" scoped>
.scroll-wrapper {
	width: 100%;
	height: 100%;
	z-index: 999;
	display: flex;
	position: absolute;
	align-items: center;
	pointer-events: none;
	justify-content: space-between;
}

.scroll-btn {
	margin: 10px;
	display: flex;
	color: #ffffff;
	border-radius: 100%;
	align-items: center;
	pointer-events: all;
	justify-content: center;
	background-color: rgba(100, 100, 100, 0.1);
	box-shadow: 0 0 20px rgba(100, 100, 100, 0.5);
	&:hover {
		cursor: pointer;
	}
}
</style>
