<template>
	<view class="content">
		<view class="newsdetail_top">
			<view class="title">{{title}}</view>
			<view class="newstime">{{create_time}}</view>
		</view>
		<view class="newsdetail_center">
			{{content}}
		</view>


	</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {
		data() {
			return {
				title: "",
				create_time: "",
				type: "",
				content: ""
			}

		},

		onShareAppMessage(res) {
			return {}
		},


		methods: {

			onLoad(e) {
				 
				var id = e.id;
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;
				var secret = globalData.secret;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				uni.request({
					url: web_site + '/api/help/details',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						rand_num: rand_num,
						time: time,
						sign: sign,
						key: key,
						secret: secret,
						id: id
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						if (result.code == '0') {
							_this.title = data.title;
							_this.push_time = data.push_time;
							_this.type = data.type;
							_this.content = data.content;

						} else if (result.code == '1') {
							uni.showToast({
								title: '信息不存在',
								icon: 'none'
							});
						}
					}
				}); 
				 
			}

		}
	}
</script>

<style lang="scss">
	.content {
		width: 90%;
		margin: 0 auto;
		padding-bottom: 50px;

		.newsdetail_top {
			padding-bottom: 15px;
			margin-bottom: 15px;
			border-bottom: 1px solid #e8e8e8;

			.title {
				font-size: 20px;
				line-height: 28px;
				margin-bottom: 10px;
				font-weight: bold;
			}

			.newstime {
				font-size: 14px;
				color: #c0c0c0;
			}
		}

		.newsdetail_center {
			font-size: 15px;
			color: #707070;
			line-height: 28px;
		}
	}
</style>
