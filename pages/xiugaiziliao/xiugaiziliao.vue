<template>
	<view class="xiugaiziliao">
		<form @submit="formSubmit">
			<view class="xiugaiziliao_list">
				<view>您的姓名：</view>
				<input type="text" value="name" v-model="name" />
			</view>
			<view class="xiugaiziliao_list">
				<view>您的性别：</view>
				<radio-group @change="radioChange" name="sex">
					<radio color="#3c5dd6" value="1" :checked="sex == 1">男</radio>
					<radio color="#3c5dd6" value="2" :checked="sex == 2">女</radio>
					<radio color="#3c5dd6" value="0" :checked="sex == 0">保密</radio>
				</radio-group>
			</view>
			<view class="xiugaiziliao_list">
				<view>联系电话：</view>
				<input type="text" v-model="mobile" />
			</view>
			<view class="xiugaiziliao_list">
				<view>联系地址：</view>
				<input type="text" v-model="address" />
			</view>
			<view class="xiugaiziliao_list">
				<view>备注信息：</view>
				<textarea v-model="remark"></textarea>
			</view>
			<view class="xiugaiziliao_list">
				<view>所属部门：</view>
				<view>{{team_name}}</view>
			</view>
			<view class="xiugaiziliao_list">
				<view>入职时间：</view>
				<view>{{entry_name}}</view>
			</view>
			<button form-type="submit">立即提交</button>
		</form>
	</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {
		data() {

			return {
				name: '',
				mobile: '',
				sex: '',
				address: '',
				remark: '',
				team_name: '',
				entry_name: ""
			}
		},
		onShow() {
			var _this = this
			_this.get_member_info();
		},
		methods: {


			radioChange(e) {
				this.sex = parseInt(e.detail.value);
			},
			formSubmit() {
				uni.showLoading({
					title: '提交中',
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

				var name = this.name;
				var sex = this.sex;
				var mobile = this.mobile;
				var address = this.address;
				var remark = this.remark;
				//是否修改
			 
				if (name == '' && sex == '' && address == '' && remark == '' && mobile == '') {
					uni.showToast({
						title: '未修改信息',
						icon: 'none'
					})
					return false;
				};
				uni.request({
					url: web_site + '/api/user/save_info',
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
						name: name,
						sex: sex,
						mobile: mobile,
						address: address,
						remark: remark
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result);
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
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)
			},
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
				wx.request({
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
						if (result.code == '0') {
							_this.name = result.data.name == '' ? '未设置' : result.data.name;
							_this.mobile = result.data.mobile;
							_this.sex = result.data.sex;
							_this.team_name = result.data.team_name == '' ? '未设置' : result.data.team_name;
							_this.entry_name = result.data.entry_name;
							_this.address = result.data.address;
							_this.remark = result.data.remark;

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

		button {
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
