<template>
	<view class="content">
		<view class="userinfo clearit" v-if="userinfo">
			<image class="userinfo-avatar" src="../../static/userinfo-avatar.jpg" mode="cover"></image>
			<navigator class="userinfo-nickname" url="/pages/login/login" hover-class="navigator-hover">[请登录]</navigator>
		</view>
		<view v-else>
			<view class="userinfo_denglu clearit">
				<image class="userinfo-avatar" :src="avatarUrl" mode="cover"></image>
				<text class="userinfo-nickname">{{userName}}</text>
				<text class="userinfo-nickphone">{{phone}}</text>
				<navigator class="info_tixing" url="/pages/tixing/tixing" open-type="switchTab" hover-class="navigator-hover">
					<text class="badge">{{message_count}}</text>
					<text class="iconfont icon-tixing"></text>
				</navigator>
				<text class="info_bumen" v-if="type == 3">公司领导</text>
				<text class="info_bumen" v-else>{{bumen}}</text>
			</view>
			<view class="index_notice">
				<view class="index_notice_title">
					<navigator class="more" url="/pages/newslist/newslist" hover-class="navigator-hover">更多></navigator>
					<text class="title_name">系统公告</text>
				</view>
				<view class="index_notice_box" v-for="(item, index) in dataList" :key="index">
					<view @tap="open(item)">
						<text :class="'type' + item.type">[{{item.type==1?'公司' : item.type==2?'团队':'个人'}}]</text>
						<text :style="item.state == 2?'font-weight:bold;color:#333':'font-weight:normal;color:#737373'">{{item.title}}</text>
					</view>

				</view>
			</view>
		</view>
		<view class="index_list">
			<view v-if="userinfo1">
               <view class="index_list_li">
					<text class="number">登陆后查看</text>
					<text class="title">客户跟进</text>
				</view>
				<view class="index_list_li">
					<text class="number">登陆后查看</text>
					<text class="title">客户提醒</text>
				</view>
			</view>
			<view v-else>
				<navigator class="index_list_li" url="/pages/kehuguanli/kehuguanli" open-type="switchTab" hover-class="navigator-hover">
                  <text class="number">{{count}}</text>
					<text class="title">客户建档</text>
                </navigator>
				<navigator class="index_list_li" url="/pages/kehuguanli/kehuguanli" open-type="switchTab" hover-class="navigator-hover">
                    <text class="number">{{log_count}}</text>
					<text class="title">客户跟进</text>
                </navigator>
				<navigator class="index_list_li" url="/pages/tixing/tixing" open-type="switchTab" hover-class="navigator-hover">
                  <text class="number">{{message_count}}</text>
				 <text class="title">客户提醒</text>
              </navigator>
			</view>
			<navigator class="index_jiandang" :url="jiandangurl" hover-class="navigator-hover">客户建档</navigator>
			<button @click="show" v-if="userinfo == false">接收小程序推送消息</button>
			<button @click="anquan" v-if="userinfo == false && type == 3">接收网站安全推送消息</button>
		</view>
	</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {
		data() {
			return {
				avatarUrl: "../../static/userinfo-avatar.jpg",
				userinfo: true,
				userinfo1: true,
				jiandangurl: "",
				phone: "",
				bumen: "",
				userName: "",
				message_count: "",
				log_count: "",
				count: "",
				dataList: [],
				type: ""
			}

		},
		onLoad() {
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					// 获取用户信息				
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							that.avatarUrl = infoRes.userInfo.avatarUrl
						}
					});
				}
			});
		},
		onShow() {
			var _this = this
			_this.get_member_info();
			_this.get_index_info();
			_this.get_notice_list();
			_this.navigation_setting();
		},
		onShareAppMessage(res) {
			return {
				title: '启凡CRM客户管理提醒',
				path: '/pages/index/index',
				imageUrl: "/static/share.jpg"
			}
		},
		methods: {
            show: function() {
				uni.requestSubscribeMessage({
					tmplIds: ['rlCV7nO-mjDBHUChFGibauOY3k6rP_eM4mgc-hOFLdk'],
					success(res) {
						if (res["rlCV7nO-mjDBHUChFGibauOY3k6rP_eM4mgc-hOFLdk"] == "accept") {
							uni.showToast({
								title: '授权成功',
								icon: 'none'
							});
						} else if (res["rlCV7nO-mjDBHUChFGibauOY3k6rP_eM4mgc-hOFLdk"] == "reject") {
							uni.showModal({
								title: '提示',
								content: '取消将无法收到客户提醒，请谨慎选择',
							});
						}
					},
					fail(res) {
						console.log(res);
					},
					complete(res) {
						console.log(res);
					}
				})
			},
			anquan: function() {
				uni.requestSubscribeMessage({
					tmplIds: ['32JFrFAMa1StFwQ8uX-U8HYTHnPSOhZLW6MdzrOxq98'],
					success(res) {
						if (res["32JFrFAMa1StFwQ8uX-U8HYTHnPSOhZLW6MdzrOxq98"] == "accept") {
							uni.showToast({
								title: '授权成功',
								icon: 'none'
							});
						} else if (res["32JFrFAMa1StFwQ8uX-U8HYTHnPSOhZLW6MdzrOxq98"] == "reject") {
							uni.showModal({
								title: '提示',
								content: '取消将无法收到网站安全提醒，请谨慎选择',
							});
						}
					},
					fail(res) {
						console.log(res);
					},
					complete(res) {
						console.log(res);
					}
				})
			},
           navigation_setting() {
				var _this = this;

				var login_status = base.member_login_check();
				if (login_status == false) {
					_this.userinfo = true;
					_this.userinfo1 = true;
					_this.jiandangurl = "/pages/login/login";

				} else {
					_this.userinfo = false;
					_this.userinfo1 = false;
					_this.jiandangurl = "/pages/kehujiandang/kehujiandang";
				}
			},

			open(item) {
				var id = item.id;
				uni.navigateTo({
					url: '/pages/newsdetail/newsdetail?id=' + id
				})
			},
			get_member_info() {
				uni.showLoading({
				   title: '加载中',
				 });
                var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;
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
						if (result.code == '0') {
							_this.userName = result.data.name == '' ? '未设置' : result.data.name;
							_this.phone = result.data.mobile;
							_this.type = result.data.type;
							_this.bumen = result.data.team_name == '' ? '未设置' : result.data.team_name;
						}
					}
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)
			},

			get_index_info() {
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
					url: web_site + '/api/index/get_index_info',
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
						var data = result.data
						console.log(result)
						if (result.code == '0') {
							_this.count = data.count == 0 ? '--' : data.count;
							_this.log_count = data.log_count == 0 ? '--' : data.log_count;
							_this.message_count = data.message_count == 0 ? '--' : data.message_count;
						}
					}
				})
			},


			get_notice_list() {
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;
				var secret = globalData.secret;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				var limit = _this.limit;

				uni.request({
					url: web_site + '/api/notice/index',
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
						limit: 5
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
						if (result.code == '0') {
							_this.dataList = data.list;
						} else if (result.code == '1') {
							uni.showToast({
								title: '暂无数据',
								icon: 'none'
							});
						}
					}
				})
			}

		}
	}
</script>

<style>
	@import url("../../css/icon.css");

	.content {
		position: fixed;
		left: 0;
		top: 0;
		overflow-y: auto;
		width: 100%;
		height: 100%;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAACwCAYAAABQButkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0JENjBCNUYyRUM3MTFFQjkxRjZGNzY2Q0E0MDg2NzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0JENjBCNjAyRUM3MTFFQjkxRjZGNzY2Q0E0MDg2NzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQkQ2MEI1RDJFQzcxMUVCOTFGNkY3NjZDQTQwODY3NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQkQ2MEI1RTJFQzcxMUVCOTFGNkY3NjZDQTQwODY3NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pndp81sAAA7/SURBVHja7N3pj53V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) no-repeat center top #f4f6ff;
		background-size: 100%;
		margin: 0 auto;
	}

	.userinfo {
		width: 90%;
		margin: 0 auto;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 5px;
	}

	.userinfo_denglu {
		width: 90%;
		margin: 0 auto;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 5px;
		position: relative;
	}

	.userinfo .userinfo-nickname {
		float: left;
		border: none;
		background: none;
		height: 30px;
		line-height: 30px;
		margin-left: 15px;
		margin-top: 20px;
	}

	.userinfo_denglu .userinfo-nickname {
		float: left;
		border: none;
		background: none;
		height: 30px;
		line-height: 30px;
		margin-left: 10px;
		margin-top: 10px;
		font-weight: bold;
		width: calc(100% - 100px);
	}

	.userinfo_denglu .userinfo-nickphone {
		float: left;
		font-size: 14px;
		color: #555555;
		margin-left: 10px;
	}

	.userinfo_denglu .info_tixing {
		position: absolute;
		right: 25px;
		top: 20px;
	}

	.userinfo_denglu .info_tixing .iconfont {
		font-size: 25px;
	}

	.userinfo_denglu .info_bumen {
		font-size: 14px;
		color: #555555;
		position: absolute;
		right: 25px;
		top: 50px;
	}

	.userinfo_denglu .info_tixing .badge {

		width: 15px;
		height: 15px;
		color: #fff;
		background: red;
		line-height: 15px;
		font-size: 8px;
		position: absolute;
		right: -5px;
		top: -5px;
		text-align: center;
		border-radius: 50%;
	}

	.userinfo-avatar {
		width: 60px;
		height: 60px;
		margin: 5px;
		border-radius: 50%;
		float: left;
	}

	.index_list {
		width: 90%;
		margin: 0 auto;
		background: #fff;
		margin-top: 10px;
		padding: 20px;
		box-sizing: border-box;
	}

	.index_list .index_jiandang {
		margin-top: 15px;
		border: none;
		background: #3c5dd6;
		color: #fff;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 5px;
		font-size: 14px;
	}

	.index_list button {
		margin-top: 15px;
		border: none;
		background: #3c5dd6;
		color: #fff;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 5px;
		font-size: 14px;
		margin-top: 5px;
	}


	.index_list .index_list_li {
		height: 45px;
		line-height: 45px;
		font-size: 15px;
		color: #8c8c8c;
		border-bottom: 1px solid #e8e8e8;
	}

	.index_list .index_list_li:last-child {
		border-bottom: none;
	}

	.index_list .index_list_li .number {
		float: right;
		color: #ff7200;
	}

	.index_notice {
		width: 90%;
		margin: 0 auto;
		background: #fff;
		margin-top: 10px;
		padding: 10px 20px;
		box-sizing: border-box;
	}

	.index_notice_title {
		height: 40px;
		line-height: 40px;

	}

	.index_notice_title .more {
		float: right;
		font-size: 14px;
		color: #a8a8a8;
	}

	.index_notice_title .title_name {
		font-size: 16px;
		position: relative;
		padding-left: 10px;
	}

	.index_notice_title .title_name::after {
		content: "";
		width: 5px;
		height: 15px;
		position: absolute;
		left: 0;
		top: 4px;
		background: #3c5dd6;
		border-radius: 3px;
	}

	.index_notice .index_notice_box {
		height: 40px;
		line-height: 40px;
		font-size: 15px;
		color: #737373;
		overflow: hidden;
	}

	.index_notice .index_notice_box .type1 {
		color: #3c5dd6;
	}

	.index_notice .index_notice_box .type2 {
		color: #ff6600;
	}

	.index_notice .index_notice_box .type3 {
		color: #cc2c2c;
	}
</style>
