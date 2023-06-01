<template>
	<view class="xiugaiziliao">
		<form @submit="xiugaimima">
			<view class="xiugaiziliao_list">
				<view>用户名：</view>
				<input type="text" v-model="name" />
			</view>
			<view class="xiugaiziliao_list">
				<view>登录密码：</view>
				<input type="text" password v-model="password" />
			</view>

			<view class="xiugaiziliao_list">
				<view>密码确认：</view>
				<input type="text" password v-model="repassword" />
			</view>
			<button form-type="submit" class="tijiao">立即提交</button>
		</form>
	</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {
		data() {

			return {
				name: "",
				password: "",
				repassword: ""
			}
		},
		onShow() {
			var _this = this
			_this.get_member_info();
		},
		methods: {

			get_member_info() {
				uni.showLoading({
				   title: '加载中',
				 });
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				uni.request({
					url: web_site + '/api/user/get_info',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						rand_num: rand_num,
						time: time,
						sign: sign,
						key: key,
						secret: secret,
						uid: uid
					},
					success: res => {
						var result = res.data;
						console.log(result)
						if (result.code == '0') {
							_this.name = result.data.name == '' ? '未设置' : result.data.name;
						}
					}
				})
                  setTimeout(function() {
				           uni.hideLoading();
				 }, 1000)
			},
			xiugaimima() {
				uni.showLoading({
				   title: '加载中',
				 });
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				var sid = uni.getStorageSync('member_id');
				var password = this.password;
				var repassword = this.repassword;
				uni.request({
					url: web_site + '/api/login/save_password',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						rand_num: rand_num,
						time: time,
						sign: sign,
						key: key,
						secret: secret,
						uid: uid,
						sid: sid,
						password:password,
						repassword:repassword
					},
					success: res => {
						var result = res.data;
						console.log(result)
						if (result.code == '0') {
							uni.showToast({
								title: "修改成功",
								icon: 'none'
							});
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 2000);
							return true;
						}else {
							uni.showToast({
								title: result.msg,
								icon: 'none'
							});
							return false;
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
	.xiugaiziliao {
		width: 90%;
		margin: 0 auto;

		.xiugaiziliao_list {
			border-bottom: 1px solid #eaeaea;
			padding: 5px 0;
			display: flex;

			button {
				margin-left: auto;
				color: #ff5a00;
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				background: none;
				padding: 0;
				width: 80px;
			}

			button::after {
				display: none;
			}

			view {
				font-size: 14px;
				color: #505050;
				height: 35px;
				line-height: 35px;
			}

			input {
				flex: 1;
				font-size: 14px;
				color: #505050;
				height: 35px;
				line-height: 35px;
			}

			picker {
				flex: 1;
				font-size: 14px;
				color: #505050;

			}

			picker_date {
				flex: 1;
				font-size: 14px;
				color: #505050;

			}

			textarea {
				flex: 1;
				color: #505050;
				line-height: 28px;
				min-height: 60px;
				font-size: 14px;
			}

			radio-group {
				flex: 1;
				height: 35px;
				line-height: 35px;

				radio {
					font-size: 16px;
					transform: scale(0.7);


				}
			}
		}

		.tijiao {
			width: 100%;
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			border-radius: 25px;
			background-image: linear-gradient(to right, #2091f1, #3c5dd6);
			color: #fff;
			margin-top: 20px;
		}
	}
</style>
