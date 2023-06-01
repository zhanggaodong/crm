<template>
	<view>
		<view class="userinfo">

			<image bindtap="bindViewTap" class="userinfo-avatar" src="/static/userinfo-avatar.jpg" mode="cover"></image>
			<view class="text">您还未授权启凡CRM小程序获取您的信息，将无法正常使用小程序的功能。如需要正常使用，请点击下方按钮，授权信息。</view>
			<button open-type="getUserInfo" @getuserinfo="getUserInfoAction"> 申请获取微信头像 </button>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
			 
			}
		},
		onLoad() {

		},

		methods: {


			// getUserInfo() {
			// 	uni.getSetting({
			// 		success: (data) => {
			// 			if (data.authSetting['scope.userInfo']) {
			// 				uni.reLaunch({
			// 				  url: '/pages/index/index'
			// 				})

			// 			} else {
   //                         uni.showModal({
   //                              title: '提示',
   //                              content: '取消将无法收到客户提醒，请谨慎选择',
   //                          });   
			// 			}
			// 		}
			// 	})
			// },
 getUserInfoAction: function(e) {
				uni.reLaunch({
				  url: '/pages/index/index'
				})
		},

		}
	}
</script>

<style>
	.userinfo {
		padding-top: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.userinfo-avatar {
		width: 160rpx;
		height: 160rpx;
		margin: 20rpx;
		border-radius: 50%;
		margin-bottom: 30px;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, .2);
	}

	button {
		width: 90%;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
		background: #3c5dd6;
		color: #fff;
	}

	.text {
		font-size: 14px;
		line-height: 28px;
		color: #545454;
		width: 90%;
		margin: 0 auto;
		margin-bottom: 20px;
	}

	.userinfo-nickname {
		color: #aaa;
	}
</style>
