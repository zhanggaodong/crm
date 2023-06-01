<template>
	<view>
  <view v-for="(item,index) in list" :key="index">
	 <view style="border-bottom: 10px solid #f2f2f2;">
	 <view class="yejichakan">
		<view class="yejichakan_list">
			<view>网站名称</view>
			<text>{{item.name}}</text>
		</view>
		<view class="yejichakan_list">
			<view>是否被篡改</view>
			<text>{{item.code_msg}}</text>
		</view>
		<view class="yejichakan_list">
			<view>是否能打开</view>
			<text>{{item.safe_msg}}</text>
		</view>
		 
		<view class="yejichakan_list">
			<view>网站标题</view>
			<text>{{item.title}}</text>
		</view>
		<view class="yejichakan_list">
			<view>网站类型</view>
			<text>{{item.type}}</text>
		</view>
		<view class="yejichakan_list">
			<view>网站地址</view>
			<text>{{item.domain}}</text>
		</view>
      </view>
	</view>
</view>
</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {
		data() {

			return {
				list:[]
			}
		},

		onShow() {
			var _this = this;
			_this.wangzhanjiankang()
		},
		methods: {

			wangzhanjiankang() {
				uni.showLoading({
				   title: '加载中',
				 });
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
					url: web_site + '/api/website/websafe',
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
						uid: uid,

					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
						if (result.code == '0') {
							_this.list = data.list; 
						} else if (result.code == '1') {
							uni.showToast({
								title: '暂无数据',
								icon: 'none'
							});
						}
					}
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)
			}

		}
	}
</script>

<style lang="scss">
	.yejichakan {
		width: 90%;
		margin: 0 auto;

		.yejichakan_list {
			border-bottom: 1px solid #eaeaea;
			height: 45px;
			line-height: 45px;
			display: flex;

			view {
				font-size: 14px;
				color: #8c8c8c;
			}

			text {

				margin-left: auto;
				font-size: 14px;
				color: #ff7200;
			}



		}

	}
</style>
