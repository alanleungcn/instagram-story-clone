<template>
	<div class="scroll-wrapper">
		<div class="scroll-btn" @click="scroll('left')">
			<font-awesome-icon
				icon="chevron-circle-left"
				size="lg"
			></font-awesome-icon>
		</div>
		<div class="scroll-btn" @click="scroll('right')">
			<font-awesome-icon
				icon="chevron-circle-right"
				size="lg"
			></font-awesome-icon>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		scroll(dir) {
			this.$emit('scroll', dir);
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 999;
}

.scroll-btn {
	margin: 10px;
	display: flex;
	color: #ffffff;
	border-radius: 100%;
	align-items: center;
	justify-content: center;
	box-shadow: 0 0 20px rgba(100, 100, 100, 0.5);
	background-color: rgba(100, 100, 100, 0.1);
	&:hover {
		cursor: pointer;
	}
}
</style>
