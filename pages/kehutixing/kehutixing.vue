<template>
	<view class="genghuantuandui">
		<form @submit="formSubmit">
			 
			<view class="genghuantuandui_list">
				<view>加入人员：</view>
				<picker @change="bindPickerChange($event)" :value="index"  :range="user_lists" :range-key="'name'">
					<text>{{user_lists[index].name}}</text><text style="display: inline-block; margin-left: 10px;">[ {{user_lists[index].team_name}} ]</text>
			   </picker>
			</view>

			<button class="tijiao" form-type="submit">立即提交</button>
		</form>
	</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {
		data() {
			return { 
				name: "",
				sid: "",
				id:"",
				index: 0,
				user_lists: []
			}
		},

		onLoad(e) {
            this.id = e.id;
		},
		onShow() {
			var _this = this
			_this.user_list()
		},

		methods: {
			bindPickerChange: function(e) {
				 
				this.index = e.target.value;
				this.sid = this.user_lists[e.detail.value].id
			  
			},

			user_list() {
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
					url: web_site + '/api/user/user_lists',
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
						 _this.user_lists = data;
					 
						} else if (result.code == '202') {
							uni.showToast({
								title: '用户被禁用',
								icon: 'none'
							});
						} else if (result.code == '102') {
							uni.showToast({
								title: '无权限',
								icon: 'none'
							});
						} else if (result.code == '201') {
							uni.showToast({
								title: '用户不存在',
								icon: 'none'
							});
						}
					}
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)
			},
			formSubmit() {
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');

				var id = this.id;
				var sid = this.sid;
                console.log(id)
				console.log(sid)
				uni.request({
					url: web_site + '/api/client/client_add',
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
						sid: sid,
						id: id,
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)

						if (result.code == '0') {

							uni.showToast({
								title: '修改成功',
								icon: 'none'
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						} else {
							uni.showToast({
								title: result.msg,
								icon: 'none'
							});
						}
					}
				})
			}


		}
	}
</script>

<style lang="scss">
	.genghuantuandui {
		width: 90%;
		margin: 0 auto;

		.genghuantuandui_list {
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

			text {
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
