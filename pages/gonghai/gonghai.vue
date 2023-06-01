<template>
	<view class="content">
		<view class="gonghai_box">
			<view class="tab_top" :class="{'is-fixed': isFixed}">
				<view class="tk-tabbox"><wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" textFlex selectClass="color-c" tabClass="color-h"></wuc-tab></view>
							
		 	</view>
			<view class="content">
				 
					<view v-if="gonghailist.length > 0">
						<view v-for="(item,index) in gonghailist" :key="index">
						  <view class="gonghai_list">
							  <navigator :url="'/pages/kehuxiangqing/kehuxiangqing?id='+item.id"  hover-class="navigator-hover">
							<view class="gonghailist_1">
								<text>公司名称</text>
								<view>{{item.name}}</view>
							</view>
							<view class="gonghailist_1">
								<text>联系电话</text>
								<view>{{item.mobile}}</view>
							</view>
							<view class="gonghailist_1" style="border-bottom: none;">
								<text>信息描述</text>
								<view>{{item.tag}}</view>
							</view>
						</navigator>
							<view class="gonghai_caidan">
								<view class="iconfont icon-caidan" @click="caidan(index)"></view>
								<view class="kehu_caidan_b" v-if="close == index"  @tap="hidePop">
									<text @tap="genjin(item)">我要跟进</text>
									<text @tap="chakan(item)">查看内容</text> 
								</view>
							</view>
						</view>	
						</view>
						<view class="user-page">{{page_text}}</view>
					</view>
					<view v-else class="wuxinxi">
						
						<image src="../../static/nodata.png"></image>
					 
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
				TabCur: 0,
				tabList: [{ name: '全部' }, { name: '团队公海' }, { name: '公司公海' }],
				isFixed: false,
				nameTop: '',
				rect: 0,
				close:-1,
				gonghailist: [],
				page:"",
				limit:"",
				group:"",
				list_all: {},
				page_all: {},
				page_text_all: {},
				page_text:""
			}
		},
		onLoad() {
			//导航吸顶
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
		  _this.gonghailist = [];
		 _this.get_sea_list()
			
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
			}
		},
		methods: {
			tabChange(index) {
				var _this = this;
				_this.TabCur = index;
				_this.group = index;
				var list_name = 'list_temp_save_' + _this.TabCur;
				var page = _this.page_all[list_name];
				var page_text = _this.page_text_all[list_name];
				var list = _this.list_all[list_name];
				if (page == undefined) {
					_this.page = 1;
					_this.page_text = '';
					_this.gonghailist = [];
					_this.get_sea_list();
				} else {
					_this.page = page;
					_this.page_text = page_text;
					_this.gonghailist = list;
				}
			},
			caidan(index) {
				this.close = index
			},
			hidePop(){
			  this.close = -1
			},
			 
			 //上拉加载更多
			 onReachBottom() {
			 	var _this = this;
			 	_this.get_sea_list();
			 },
			 get_sea_list(){
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
			 	  var group = _this.group;
			 	  var page = parseInt(_this.page);
			 	  if (isNaN(page)) page = 1;
				 
			 	  uni.request({
			 	  	url: web_site + '/api/sea/index',
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
			 			group:group
			 	  	},
			 	  	success: res => {
			 	  		var result = res.data;
			 	  		var data = result.data;  
						console.log(result)
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
			 	  				var list = _this.gonghailist;
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
			 	   
			 	  })
			 	    setTimeout(function() {
			 	               uni.hideLoading();
			 	     }, 1000)
			 	
			 },
			 chakan(item){
				 var id = item.id;
				   uni.navigateTo({
				 	  url: '/pages/kehuxiangqing/kehuxiangqing?id='+id
				 }) 
			 },
			 
			 genjin(item){
				 var _this = this;
				 var id = item.id;
				 var group = item.group;
				 var globalData = getApp().globalData;
				 var web_site = globalData.web_site;
				 var key = globalData.key;
				 var secret = globalData.secret;
				 var time = base.get_time();
				 var rand_num = base.get_rand_num(8);
				 var sign = base.get_app_key(secret, key, rand_num, time);
				 var uid = uni.getStorageSync('member_id');
				 console.log(id)
				  console.log(group)
				 uni.request({
				 	url: web_site + '/api/sea/grab_client',
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
				 		group:group
				 	},
				 	success: res => {
				 		var result = res.data;
				 		var data = result.data; 
						 console.log(result)
				 		if (result.code == '0') {
				 			uni.showToast({
				 				title: '跟单成功',
				 				icon: 'none'
				 			});
				 		}else if (result.code == '1') {
				 			   uni.showToast({
				 			  title: '跟单失败',
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
	@import url("../../css/icon.css");

	.content {
		width: 100%;

		.gonghai_box {
			margin-top: 15px;

			.tab_top {
				width: 100%;
				padding: 0 5%;
				box-sizing: border-box;
				margin: 0 auto;
				border-bottom: 1px solid #e8e8e8;
				height: 36px;
				background: #fff;
				-webkit-transition: all .3s;
				transition: all .3s;
			}

			.gonghai_list {
				padding: 15px;
				box-sizing: border-box;
				border-bottom: 15px solid #f3f3f3;
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
						background:url(../../static/more_bg.png) no-repeat top center;
						background-size: 100%;
						padding-top:10px;
						width: 70px;
						z-index: 99;
					
						text {
							border: 1px solid #e8e8e8;
							border-top: none;
							background:  #fff;
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

				.gonghailist_1 {
					display: flex;
					align-items: flex-start;
					border-bottom: 1px solid #e8e8e8;
					padding: 10px 0;

					text {
						font-size: 15px;
						color: #8c8c8c;
						width: 65px;

					}

					view {
						font-size: 15px;
						color: #414141;
						margin-left: 5px;
						width: calc(100% - 70px);
					}

				}
             
				.gonghailist_2 {
					padding-top: 10px;
					display: flex;
					align-items: center;
					justify-content: center;

					button {
						width: 40%;
						height: 35px;
						line-height: 35px;
						color: #fff;
						border-radius: 25px;
						font-size: 14px;
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
	}
	
	.wuxinxi{
		padding-top: 100px;
		image{
			display: block;
			width:50px;
			height: 50px;
			margin: 0 auto;
		}
	}
	
</style>
