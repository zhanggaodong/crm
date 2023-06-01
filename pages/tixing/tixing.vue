<template>
	<view class="content">
		<view v-if="tixinglist.length　>　0">
			<view class="tixing_list" v-for="(item,index) in tixinglist" :key="item.id">
				<view class="tixing_title">
					<view class="tixing_t">{{item.remind_time_name}}跟进提醒</view>
					<view class="tixing_z" :style="item.status == 1?'background:#3c5dd6':'background:#ff5400'">{{item.status_name}}</view>
				</view>
				<view class="tixing_content">
					<text>{{item.remind_time_name}},</text>
					<text>{{item.name}},</text>
					<text>{{item.mobile}},</text>
					<text>{{item.address}}</text>，请及时跟进
				</view>
				<view class="tixing_s clearit">
					<view class="tixing_time">
						<view class="iconfont icon-shijian"></view>{{item.remind_time_name}}
					</view>
					<button @click="queren(item)">确认</button>
				</view>
			</view>
			<view>{{page_text}}</view>
		</view>　
		　　<view v-else class="wuxinxi">

			<image src="../../static/nodata.png"></image>

		</view>
	</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {

		data() {
			return {
				tixinglist: [],
				limit: "",
				page: "",
				page_text:""
			}
		},
		onLoad() {

		},
		onShow() {

			var _this = this;
			var login_status = base.member_login_check();
			if (login_status == false) {
				uni.showModal({
					title: '提示',
					content: '账号尚未登录，请先登录账号',
					success: res => {
						if (res.confirm) {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						} else if (res.cancel) {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					}
				})
			};
			_this.page = 1;
			_this.tixinglist = []; 
			_this.get_message_list() 
		},

		//上拉加载更多
		onReachBottom() {
			var _this = this;
			_this.get_message_list();
		},
		onPullDownRefresh() {
			var _this = this;
			_this.get_message_list();
		},



		methods: {
			navigation_setting() {
				var _this = this;
				var login_status = base.member_login_check();
				if (login_status == false) {

				}
			},

			get_message_list() {
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
				var page = parseInt(_this.page);
				if (isNaN(page)) page = 1; 
				uni.request({
					url: web_site + '/api/message/index',
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
						page: page,
						limit: 20
					},
					success: res => {
						var result = res.data;
						console.log(result)
						if (result.code == '0') {
							var data = result.data;
							var list = data.list; 
							if (list == undefined || list == '') {
								_this.page_text = '—— 到底啦 ——';
								return false;
							}
							if (list.length > 0) {
								var invite_list = _this.tixinglist;
								for (var i = 0; i < list.length; i++) {
									invite_list.push(list[i]);
								}
								page++;
								_this.page = page;
							}
						}
					}
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)
			},


			queren(item) {
				uni.showModal({
				title: '提示',
				content: '您确定已经跟进了吗？',
				confirmColor: '#fd771e',
				success: res => {
					if (res.confirm) {
						var _this = this;
						var globalData = getApp().globalData;
						var web_site = globalData.web_site;
						var key = globalData.key;;
						var secret = globalData.secret;;
						var time = base.get_time();
						var rand_num = base.get_rand_num(8);
						var sign = base.get_app_key(secret, key, rand_num, time);
						var uid = uni.getStorageSync('member_id');
						var cid = item.cid;
						var id = item.id;
                        uni.request({
								url: web_site + '/api/message/handle',
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
									cid: cid,
									id: id,

								},
								success: res => {
									var result = res.data;
									
									if (result.code == '0') {
										uni.showToast({
											title: '已处理',
											icon: 'none'
										})
									  _this.page = 1;
									  _this.tixinglist = []; 
                                      this.get_message_list()
									} else {
										uni.showToast({
											title: result.msg,
											icon: 'none'
										});
									}
								}

							});
				    	}
					 }
			    });
			}
     	}
	}
</script>

<style lang="scss">
	@import url("../../css/icon.css");

	template {
		background: #f3f3f3
	}

	.content {
		width: 100%;
		
		.tixing_list {
			margin-bottom: 15px;
			background: #FFFFFF;
			border-bottom: 15px solid #f3f3f3;
			padding: 15px;
			box-sizing: border-box;

			.tixing_title {
				display: flex;
				align-items: center;
				height: 35px;
				line-height: 35px;

				.tixing_t {
					font-size: 18px;
					color: #333;
				}

				.tixing_z {
					height: 20px;
					line-height: 20px;
					padding: 0 5px;
					font-size: 10px;
					border-radius: 25px;
					color: #fff;
					margin-left: 5px;
				}
			}

			.tixing_content {
				font-size: 14px;
				line-height: 24px;
				color: #767676;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.tixing_s {
				margin-top: 10px;

				.tixing_time {
					font-size: 14px;
					color: #c6c6c6;
					float: left;
					height: 25px;
					display: flex;
					align-items: center;
					line-height: 25px;

					.iconfont {
						display: inline-block;
						font-size: 14px;
						margin-right: 5px;
						color: #c6c6c6;
					}
				}

				button {
					width: 60px;
					height: 25px;
					line-height: 25px;
					float: right;
					color: #909090;
					border-radius: 25px;
					border: 1px solid #cfcfcf;
					background: #fff;
					font-size: 12px;
				}

				button::after {
					display: none;
				}
			}
		}
	}

	.wuxinxi {
		padding-top: 100px;

		image {
			display: block;
			width: 50px;
			height: 50px;
			margin: 0 auto;
		}
	}
</style>
