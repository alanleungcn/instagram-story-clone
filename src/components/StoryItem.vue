<template>
	<div class="item" @click="viewStory()">
		<div :class="{ read: isRead, unread: !isRead }">
			<div class="avatar-wrapper">
				<img :src="image" class="avatar" />
			</div>
		</div>
		<div class="name">{{ name }}</div>
	</div>
</template>

<script>
export default {
	props: {
		name: String,
		image: String,
		isRead: Boolean
	},
	methods: {
		viewStory() {
			this.$emit('viewStory', this.name);
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

.item {
	gap: 2.5px;
	@include center;
	flex-direction: column;
	margin: 0 10px 0 10px;
	cursor: pointer;
	user-select: none;
}

.read {
	@include center;
	width: 57.5px;
	height: 57.5px;
	border-radius: 100%;
	background-color: #dbdbdb;
}

.unread {
	@include center;
	width: 57.5px;
	height: 57.5px;
	border-radius: 100%;
	background: linear-gradient(
		45deg,
		#f09433 0%,
		#e6683c 25%,
		#dc2743 50%,
		#cc2366 75%,
		#bc1888 100%
	);
}

.avatar-wrapper {
	@include center;
	border-radius: 100%;
	width: 50px;
	height: 50px;
	box-shadow: 0 0 0 2px #ffffff;
}

.avatar {
	width: 50px;
	height: 50px;
	border-radius: 100%;
	border: 0.25px solid #dbdbdb;
}

.name {
	color: #8e8e8e;
	font-size: 12.5px;
}
</style>
