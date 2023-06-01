<template>
	<view class="content">
		<view class="index_notice">
			 <view class="index_notice_box" v-for="(item, index) in messagelist" :key="index">
				<view @tap="open(item)">
				  <text>{{item.mycall}}</text>
				</view>
			</view>
			<view>{{page_text}}</view>
		</view>
	</view>
</template>

<script>
	import base from '@/common/base.js'; 
	export default {
		data() {
			return {
				 messagelist: [],
				 page:'',
				 limit:'',
				 page_text:""
	
	
			}
	
		},
		onShow() { 
			 var _this = this;
			 _this.get_message_list();
		},
		//上拉加载更多
		onReachBottom() {
			var _this = this;
			_this.get_message_list();
		},
		onPullDownRefresh(){
			var _this = this;
			_this.get_message_list();
		},
		
	   methods: {
			open(item){
				var id = item.id;
				uni.navigateTo({
					url: '/pages/liuyanxiangqing/liuyanxiangqing?id='+id
				})
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
				 	url: web_site + '/api/website/get_message_list',
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
				 				var invite_list = _this.messagelist;
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
			  }
		}
	}
</script>

<style>
	.content{
		width: 90%;
		margin: 0 auto;
		padding-bottom: 50px;
	}
	 .index_notice .index_notice_box {
	 	height: 45px;
	 	line-height: 45px;
	 	font-size: 15px;
		border-bottom: 1px solid #e8e8e8;
	 	color: #737373;
	 	overflow: hidden;
	 }
</style>
