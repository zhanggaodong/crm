<template>
	<view class="content">
	 <view class="top">
		 <form  class="form">
		   <view class="search">
			    <view class="iconfont icon-sousuo"></view>
				<input type="text" v-model="keyword" placeholder="名称/联系人/电话/地址" />
				<button @click="submit" form-type="submit">搜索</button>
		  </view>
       </form>
	   <view class="wode" v-if="k_type == 3||k_type == 2">
		  <switch @change="isChecked" type="checkbox" style="transform:scale(0.8); " color="#3c5dd6" />
		  <text class="iconfont icon-zhikanwode"></text>
	   </view>
	   
	 </view>	
	 <view class="kehuguanli_box">
			<view class="tab_top" :class="{'is-fixed': isFixed}">
               <view class="tk-tabbox">
					<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" textFlex selectClass="color-c" tabClass="color-h"></wuc-tab>
				</view>
            </view>
			<view class="content">
				<view v-if="list.length > 0">
					<view v-for="(item,index) in list" :key="index">
					 <view  class="kehu_list">
						 <navigator :url="'/pages/kehuxiangqing/kehuxiangqing?id='+item.id"  hover-class="navigator-hover">
						<view class="kehu_title">
							<view class="kehu_t">{{item.name}}</view>
							<view :class="'kehu_z backgroundColor'+item.status">{{item.status_name}}</view>
						</view>
						 <view class="kehu_content">
							{{item.mobile}}
						</view>
						<view class="kehu_s clearit">
							<view class="kehu_time">
								<view class="iconfont icon-shijian"></view>{{item.time_name}}
							</view>
						</view>
					</navigator>	
						<view class="kehu_caidan">
							<view class="iconfont icon-caidan" @click="caidan(index)"></view>
							<view class="kehu_caidan_b" v-if="close == index" @tap="hidePop">
								<text @tap="chakan(item)">查看</text>
								<text @click="jiarut(item)">加入</text>
								<text v-if="item.message_count == 0" @click="tixing(item)">提醒</text>
								<text v-if="item.message_count == 1" @click="notixing">提醒</text>
							</view>
						</view>
						
						</view>
					
					</view>
					<view class="user-page">{{page_text}}</view>
                 </view>
				<view v-else class="wuxinxi">

					<image src="../../static/nodata.png"></image>

				</view>

				<view class="kehu_tanchuang" v-if="kehu_tanchuang == true">
					<view class="kehu_tanchuang_zhezhao">
						<view class="kehu_tanchuang_zhezhao_box">
							<view class="genjin_gengxin">
								<view class="gengxin_title">人员加入</view>
								<form @submit="formSubmit_kehu_jiaru(id)">
									<view class="gengxin_list">
										<view>客户名称：</view>
										<view class="text">{{name}}</view>
									</view>
									<view class="gengxin_list">
										<view>选择要加入的成员：</view>
										<picker @change="bindPickerChange" :range="user_lists" :range-key="'name'" :value="index">
											<text>{{user_lists[index].name}}</text>
										</picker>
									</view>
									<button form-type="submit" style="margin-top: 20px;">立即提交</button>
								</form>
							</view>
							<view @click="fenqitanchuang_close_dantiao" class="iconfont icon-guanbi"></view>
						</view>
					</view>
				</view>
 
				<view class="kehu_tanchuang" v-if="kehu_tanchuang_tixing == true">
					<view class="kehu_tanchuang_zhezhao">
						<view class="kehu_tanchuang_zhezhao_box" style="height: 350px;">
							<view class="genjin_gengxin" style="height: 290px;">
								<view class="gengxin_title">客户转移</view>
								<form @submit="formSubmit_kehu_tixing(id)">
									<view class="gengxin_list">
										<view class="t">客户名称:</view>
										<view class="text">{{name}}</view>
									</view>
									<view class='gengxin_list'>
										<view class="t">提醒时间:</view>
										<view class="text">
											<dy-Date timeType="day" v-model="remind_time" @getData="getData" placeholder="请选择日期" minSelect="2000/01/01"
											 maxSelect="2025/12/31"></dy-Date>
										</view>
									</view>
									<view class='gengxin_list'>
										<view class="t">一直提醒:</view>
										<view class="text">
											<switch @change="switch1Change" style="transform:scale(0.8)" color="#3c5dd6" />
										</view>
									</view>
									<view class='gengxin_list'>
										<view class="t">提醒频率:</view>
										<view class="text text_x">
											<radio-group @change="radio_zhuangtai" v-model="rate">
												<radio :checked="rate == 1" value="1" style="transform:scale(0.8)" color="#3c5dd6">1小时</radio>
												<radio :checked="rate == 2" value="2" style="transform:scale(0.8); margin-left: -10px;" color="#3c5dd6">2小时</radio>
												<radio :checked="rate == 3" value="3" style="transform:scale(0.8); margin-left: -10px;" color="#3c5dd6">3小时</radio>
												<radio :checked="rate == 4" value="4" style="transform:scale(0.8);margin-left: -10px" color="#3c5dd6">4小时</radio>
											</radio-group>
										</view>
									</view>
                                  <button form-type="submit" style="margin-top: 20px;">立即提交</button>
								</form>
							</view>
							<view @click="fenqitanchuang_close_tixing" class="iconfont icon-guanbi"></view>
						</view>
					</view>
				</view>
            </view>
		</view>
		<view class="xinzeng" @click="jiandang">
			<view class="iconfont icon-hao"></view>
		</view>

	</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {
		data() {
			return {
				TabCur: 0,
				tabList: [{
					name: '全部'
				}, {
					name: '跟进中'
				}, {
					name: '签约成功'
				}, {
					name: '签约失败'
				}],
				isFixed: false,
				nameTop: '',
				rect: 0,
				close: -1,
				status: 0,
				list: [],
				page: '',
				limit: '',
				list_all: {},
				page_all: {},
				page_text_all: {},
				keyword: '',
				name: "",
				sid: "",
				kehu_tanchuang: false,
				kehu_tanchuang_zhuanyi: false,
				kehu_tanchuang_tixing: false,
				index: 0,
				user_lists: [],
				cid: "",
				remind_time: "",
				state: "",
				rate: "",
				page_text:"",
				type:"",
				k_type:""
			}
		},
		onLoad() {
			let that = this;
			const query = wx.createSelectorQuery();
			query.select('#scrollId').boundingClientRect();
			query.exec(function(res) {
				console.log(res)
				if (res && res[0])
					that.nameTop = res[0].top
			}); 
		},

		onShow() {
			var _this = this;
			_this.keyword = "";
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
			_this.list = []; 
			_this.client_list()
			_this.get_member_info()
		},

		onPageScroll(e) {

			this.rect = e.scrollTop;
		},
		computed: {
			
			//滑动组件置顶
			pageFixed() {
				if (this.rect > this.nameTop) {
					this.isFixed = true;
				} else {
					this.isFixed = false;
				}
			},
			 
		},

		

		methods: {
			 
			bindPickerChange: function(e) {

				this.index = e.target.value;
				this.sid = this.user_lists[e.detail.value].id

			},
			getData(value) {
				this.remind_time = value
			},
			switch1Change: function(e) {
				
				if (e.detail.value == true) {
					this.state = 1
				} else if (e.detail.value == false) {
					this.state = 2
				}
				
			},
			radio_zhuangtai(e) {
				this.rate = parseInt(e.detail.value);
			},
			notixing() {
				uni.showToast({
					title: '当前客户您有进行中的提醒',
					icon: 'none'
				});
			},
			
			 
			isChecked: function(e) {
				var that = this;
				if (e.detail.value == true) {
				   that.type = 2,
				   that.list = [], 
				   that.page = 1;
				   that.client_list()
					
				} else if (e.detail.value == false) {
					  that.page = 1;
					 that.type = 1,
					  that.list = [], 
					 that.client_list()
				}
			},
			jiarut(item) {
				var _this = this;
				_this.kehu_tanchuang = true;
				var kid = item.id;
				this.id = item.id;
				_this.user_list();
				_this.get_user_client_info(kid);
			},
			tixing(item) {
				var _this = this;
				_this.kehu_tanchuang_tixing = true;
				var kid = item.id;
				this.id = item.id;
				_this.user_list();
				_this.get_user_client_info(kid);
			},
			 
			 
			 formSubmit_kehu_tixing(item) {
			 	var _this = this;
			 	var globalData = getApp().globalData;
			 	var web_site = globalData.web_site;
			 	var key = globalData.key;;
			 	var secret = globalData.secret;;
			 	var time = base.get_time();
			 	var rand_num = base.get_rand_num(8);
			 	var sign = base.get_app_key(secret, key, rand_num, time);
			 	var uid = uni.getStorageSync('member_id');
			 	var cid = this.id;
			    var state = this.state;
				var rate = this.rate;
				var remind_time = this.remind_time;
				console.log(cid)
				console.log(state)
				console.log(rate)
				console.log(remind_time)
			 	uni.request({
			 		url: web_site + '/api/message/add',
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
						remind_time:remind_time,
						rate:rate,
						state:state,
			 			
			 		},
			 		success: res => {
			 			var result = res.data;
			 			var data = result.data;
						  if (result.code == '0'){
			 				uni.showToast({
			 					title: '添加成功',
			 					icon: 'none'
			 				});
						 this.kehu_tanchuang_tixing = false;
			 			}else{
							uni.showToast({
								title: result.msg,
								icon: 'none'
							});
						} 
			 		}
			 	});
		    },
			 

			fenqitanchuang_close_dantiao() {
				var _this = this;
				_this.kehu_tanchuang = false;

			},
			 
            fenqitanchuang_close_tixing() {
				var _this = this;
				_this.kehu_tanchuang_tixing = false;
				this.rate = "";
				
			},

			//上拉加载更多
			onReachBottom() {
				var _this = this;
				_this.client_list();
			},

			get_user_client_info(kid) {
				uni.showLoading({
					title: '加载中',
				});
				var kid = kid;
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
					url: web_site + '/api/client/get_client_info',
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
						id: kid,
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
						console.log(data)
						if (result.code == '0') {
							_this.name = data.info.name;

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


			},

			formSubmit_kehu_jiaru() {
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
				var sid = _this.sid;
				 
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
						id: id,
						sid: sid,


					},
					success: res => {
						var result = res.data;
						var data = result.data;
						if (result.code == '0') {
							uni.showToast({
								title: '提交成功',
								icon: 'none'
							})
							this.kehu_tanchuang = false;
						} else {
							uni.showToast({
								title: result.msg,
								icon: 'none'
							});
						}
					}
				});

			},
			  
			
			  
			  
			  client_list() {
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
				var status = _this.status; 
				var type = this.type;
				var page = parseInt(_this.page);
				var keyword = this.keyword;
				if (isNaN(page)) page = 1; 
				uni.request({
					url: web_site + '/api/client/index',
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
						limit: 15,
						status: status,
						type:type
					},
					success: res => {
						var result = res.data;
						var data = result.data;   
						if(keyword==''){
						if (result.code == '0') {
						    var list_name = 'list_temp_save_' + _this.TabCur;
							var data = result.data;
							if (data == undefined || data == '') {
								_this.page_text = '—— 到底啦 ——';
								_this.page_text_all[list_name] = _this.page_text;
								return false;
							}
							var list = data;
							var new_list = data.list;
							if (new_list.length > 0) {
								var list = _this.list;
								for (var i = 0; i < new_list.length; i++) {
									list.push(new_list[i]);
								}
								_this.page_all[list_name] = page;
								_this.list_all[list_name] = list;
								page++;
								_this.page = page;
							}
						} 
					 }
					 }
                 })
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)

			},
			
			tabChange(index) {
				var _this = this;
				_this.TabCur = index;
				_this.status = index;
				
			 	var list_name = 'list_temp_save_' + _this.TabCur;
			    var page = _this.page_all[list_name];
			    var page_text = _this.page_text_all[list_name];
			    var list = _this.list_all[list_name];
				 if (page == undefined) {
				 	_this.page = 1;
				 	_this.page_text = '';
				 	_this.list = [];
				 	_this.client_list();
				 } else {
				 	_this.page = page;
				 	_this.page_text = page_text;
				 	_this.list = list;
				 }
				 
			},
			
			submit(){
				var _this = this;
				_this.list = [];
				_this.page = 1;
			    _this.formSearch()
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
					url: web_site + '/api/client/index',
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
						limit: 99,
						keyword: keyword
					},
					success: res => {
						var result = res.data;
						var data = result.data;  
						console.log(result)
						if (result.code == '0') {
						    _this.list = data.list 
						 }else{
							 uni.showToast({
							 	title: result.msg,
							 	icon: 'none'
							 });
						 }
					 }
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)
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
						console.log(data)
						if (result.code == '0') {
							_this.user_lists = data

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

			caidan(index) {
				this.close = index
			},
			hidePop() {
				this.close = -1
			},
			jiandang(item) {

				uni.navigateTo({
					url: '/pages/kehujiandang/kehujiandang'
				})
			},
			chakan(item) {
				var id = item.id;
				uni.navigateTo({
					url: '/pages/kehuxiangqing/kehuxiangqing?id=' + id
				})
			},
			
			//获取用户基本信息
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
						console.log(result)
						if (result.code == '0') { 
							 _this.k_type = result.data.type; 
							 console.log(_this.k_type)
				    	 }
					}
				})
			
			},

		}
	}
</script>

<style lang="scss">
	@import url("../../css/icon.css");

	.color-c {
		color: #3b5ed6;
	}

	.gengxin_title {
		font-size: 16px;
		position: relative;
		padding-left: 10px;
		margin-bottom: 15px;
	}

	.gengxin_title::after {
		content: "";
		width: 5px;
		height: 15px;
		position: absolute;
		left: 0;
		top: 4px;
		background: #3c5dd6;
		border-radius: 3px;
	}

	.kehu_tanchuang_zhezhao {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.5);
		left: 0;
		top: 0;
		z-index: 99999;

		.kehu_tanchuang_zhezhao_box {
			width: 90%;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			height: 280px;

			.genjin_gengxin {
				background: #fff;
				border: none;
				border-radius: 5px;
				height: 220px;
				padding: 15px;
				box-sizing: border-box;
			}

			.icon-guanbi {
				position: absolute;
				bottom: 0;
				right: 0;
				left: 0;
				margin: auto;
				width: 30px;
				height: 30px;
				border: 1px solid #fff;
				border-radius: 50%;
				line-height: 30px;
				color: #fff;
				font-size: 9px;
			}
		}

	}

	.gengxin_list {

		line-height: 40px;
		display: flex;
		border-bottom: 1px solid #e8e8e8;
		font-size: 14px;
		color: #8c8c8c;

		.t {
			margin-right: 10px;
		}

		.text {
			flex: 2;
			height: 40px;
			line-height: 40px;
		}

		picker {

			flex: 2;
			height: 40px;
			line-height: 40px;
		}

	}

	.genjin_gengxin {
		button {
			width: 100%;
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			border-radius: 25px;
			background-image: linear-gradient(to right, #2091f1, #3c5dd6);
			color: #fff;
		}
	}

	.content {
		width: 100%;
        .top{
			display: flex;
			width: 90%;
			margin: 0 auto;
			align-items: center;
			.wode{
				flex: .8;
				height: 30px;
				line-height: 30px; 
				text-align: center;
				font-size: 14px;
			   display: flex;
			   align-items: center;
			   justify-content: center; 
				margin-left: 10px;
				color: #3c5dd6;
				box-sizing: border-box; 
				background-size: 20px;
				.iconfont{
					    font-size: 24px;
					    color: #333;
					    height: 24px;
				}
			}
			.form{
				flex: 5;
				.search {
					height: 40px; 
					background: #f1f4fc;
					border-radius: 25px;
					flex: 4;
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
						flex: 2;
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
			}
		}
		

		.kehuguanli_box {
			margin-top: 15px;

			.tab_top {
				width: 100%;
				padding: 0 5%;
				box-sizing: border-box;
				margin: 0 auto;
				border-bottom: 1px solid #e8e8e8;

				height: 36px;
				background: #fff;
				-webkit-transition: all .3s ease-in-out 0s;
				transition: all .3s ease-in-out 0s;
			}
		}

		.kehu_list {
			border-bottom: 15px solid #f3f3f3;
			background: #FFFFFF;
			padding: 15px;
			box-sizing: border-box;
			position: relative;

			.kehu_title {
				display: flex;
				align-items: center;
				height: 35px;
				line-height: 35px;
				width: 85%;

				.kehu_t {
					font-size: 18px;
					color: #333;
					max-width: 84%;
					height: 35px;
					line-height: 35px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
 
				.kehu_z {
					height: 20px;
					line-height: 20px;
					padding: 0 5px;
					font-size: 10px;
					border-radius: 25px;
					color: #fff;
					margin-left: 5px;
				}
				.backgroundColor1{
					background:#3e5ed7 ;
				}
				.backgroundColor2{
					background:#3bbc83 ;
				}
				.backgroundColor3{
					background:#000000 ;
				}
				.backgroundColor0{
					background:#fe6601 ;
				}
			}

			.kehu_content {
				font-size: 14px;
				line-height: 24px;
				color: #767676;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.kehu_s {
				margin-top: 10px;

				.kehu_time {
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

			.kehu_caidan {
				position: absolute;
				width: 25px;
				top: 17px;
				right: 25px;

				.iconfont {
					font-size: 10px;
					color: #d9d9d9;
					height: 30px;
					line-height: 30px;
				}

				.kehu_caidan_b {
					position: absolute;
					right: -7px;
					top: 19px;
					background: url(../../static/more_bg.png) no-repeat top center;
					background-size: 100%;
					padding-top: 7px;
					width: 60px;
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
		}

		.is-fixed {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 999;
		}

		.xinzeng {
			width: 50px;
			height: 50px;
			position: fixed;
			right: 20px;
			bottom: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #3c5dd6;
			border-radius: 50%;

			.iconfont {
				font-size: 20px;
				color: #fff;
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
	
	@media(max-width:370px) {
		.text_x{
			 radio-group{
				 width: 105%;
			 }
		}
	}
	
</style>
