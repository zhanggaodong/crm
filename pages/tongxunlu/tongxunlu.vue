<template>
	<view class="content">
		<form @submit="formSearch">
			<view class="search">
		
				<view class="iconfont icon-sousuo"></view>
				<input type="text" v-model="keyword" placeholder="名称/联系人/电话/地址" />
				<button form-type="submit">搜索</button>
		
			</view>
		</form>
		<view class="tongxunlu">
			<view v-if="tongxunlu_list.length > 0">
			<view v-for="(item,index) in tongxunlu_list" :key="index">
				<view class="tongxunlu_li clearit">
					<view class="img">
						<image :src="item.avatar==''?'/static/userinfo-avatar.jpg':item.avatar"></image>
					</view>
					<view class="tongxunlu_r">
						<view class="title">
							<view class="name">
								{{item.name}}
							</view>
							<view class="phone" @click="makePhoneCall(item)">
								{{item.mobile}}
							</view>
						</view>
						<view class="address">
							<view class="iconfont icon-dizhi"></view>
							{{item.address ==''?'还未设置地址':item.address}}
						</view>
					</view>
					<view class="gonghai_caidan" v-if="type == 3||type == 2">
						<view class="iconfont icon-caidan" @click="caidan(index)"></view>
						<view class="kehu_caidan_b" v-if="close == index" @tap="hidePop">
							<text @tap="yejichakan(item)"  v-if="type == 3||type == 2">业绩查看</text>
							<text @tap="genghuantuandui(item)" v-if="type == 3">更换团队</text>
							<text @tap="xiugaimima(item)" v-if="type == 3">修改密码</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view style="text-align:center;height:50vh;line-height:50vh;font-size:15px;color: #555;">暂无团队成员</view>
		</view>
		</view>
	</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {
		data() {
			return {
            close: -1,
				page: "",
				limit: "",
				type:"",
				tongxunlu_list: [],
				Keyword:""
			}
		},
		onShow() {
			var _this = this
			_this.get_user_list();
			_this.get_member_info()
		},
		methods: {
          caidan(index) {
				this.close = index
			},
			hidePop() {
				this.close = -1
			},
            get_member_info() {
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
						if (result.code == '0') {
							_this.type = result.data.type; 
				    	 }
					}
				})

			},
			
			formSearch() {
				uni.showLoading({
					title: '提交中',
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
				var keyword = _this.keyword;
				var page = parseInt(_this.page);
				if (isNaN(page)) page = 1; 
				uni.request({
					url: web_site + '/api/user/get_user_list',
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
						limit: 20,
						keyword: keyword
					},
					success: res => {
						var result = res.data;
						if (result.code == '0') {
							var data = result.data;
							var list = data.list; 
							if (list == undefined || list == '') {
								_this.page_text = '—— 到底啦 ——';
								return false;
							}
							if (list.length > 0) {
								var invite_list = _this.tongxunlu_list;
								for (var i = 0; i < list.length; i++) {
									invite_list.push(list[i]);
								}
								page++;
								_this.page = page;
							}
						} else if (result.code == '1') {
							uni.showToast({
								title: '没有搜索到结果',
								icon: 'none'
							});
						}
					}
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)
			},
			
			get_user_list() {
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
					url: web_site + '/api/user/get_user_list',
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
						if (result.code == '0') {
							var data = result.data;
							var list = data.list; 
							if (list == undefined || list == '') {
								_this.page_text = '—— 到底啦 ——';
								return false;
							}
							if (list.length > 0) {
								var invite_list = _this.tongxunlu_list;
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
			makePhoneCall(item) {
				var phone = item.mobile;
               uni.makePhoneCall({
                   phoneNumber: phone 
               });
			},
			
			
          genghuantuandui(item) {
			   var id = item.id;
			   
				uni.navigateTo({
					url: '/pages/genghuantuandui/genghuantuandui?id=' + id 
				})
			},
			xiugaimima(item) {
				var id = item.id;
				uni.navigateTo({
					url: '/pages/tuanduimima/tuanduimima?id=' + id 
				})
			},
			yejichakan(item) {
				var id = item.id;
				var type = item.type;
				uni.navigateTo({
					url: '/pages/yejichakan/yejichakan?id=' + id + '&type=' + type
				})
			}

		}
	}
</script>

<style lang="scss">
	@import url("../../css/icon.css");

	.search {
		height: 40px;
		width: 90%;
		margin: 0 auto;
		background: #f1f4fc;
		border-radius: 25px;
		display: flex;
		align-items: center;
		padding: 0 15px;
		box-sizing: border-box;
		padding-right: 3px;
	
		.iconfont {
			font-size: 20px;
			color: #3c5dd6;
			margin-right: 10px;
		}
	
		input {
			font-size: 13px;
			color: #333;
			flex: 5;
		}
	
		button {
			flex: 1;
			border: none;
			background: none;
			font-size: 14px;
			padding: 0;
			background: #fff;
			color: #3e5ed7;
			border-radius: 25px;
	
		}
	
		button::after {
			display: none;
		}
	}

	.tongxunlu {
		width: 100%;

		.tongxunlu_li {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			border-bottom: 15px solid #f4f4f4;
			position: relative;

			.gonghai_caidan {
				position: absolute;
				width: 25px;
				top: 18px;
				right: 25px;

				.iconfont {
					font-size: 10px;
					color: #d9d9d9;
					height: 30px;
					line-height: 30px;
				}

				.kehu_caidan_b {
					position: absolute;
					right: -10px;
					top: 19px;
					background: url(../../static/more_bg.png) no-repeat top center;
					background-size: 100%;
					padding-top: 10px;
					width: 70px;
					z-index: 99;

					text {
						border: 1px solid #e8e8e8;
						border-top: none;
						background: #fff;
						display: block;
						height: 30px;
						line-height: 30px;
						text-align: center;
						font-size: 14px;
						border-bottom: 1px solid #e8e8e8;
						color: #8e8e8e;
					}
				}
			}

			.img {
				width: 60px;
				height: 60px;
				float: left;

				image {
					display: block;
					width: 100%;
					height: 60px;
				}
			}

			.tongxunlu_r {
				float: left;
				margin-left: 15px;
				width: calc(100% - 75px);
				padding-top: 7px;

				.title {
					display: flex;
					margin-bottom: 10px;

					.name {
						font-size: 18px;
						color: #333;
						margin-right: 5px;
					}

					.phone {
						font-size: 14px;
						color: #3c5dd6;
						margin-top: 5px;
					}
				}

				.address {
					font-size: 14px;
					color: #343434;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;

					.iconfont {
						display: inline-block;
						margin-right: 5px;
					}
				}

			}
		}
	}
</style>
