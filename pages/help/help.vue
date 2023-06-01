<template>
	<view class="content">
		<view class="index_notice">
			<view v-if="dataList.length > 0">
			 <view class="index_notice_box" v-for="(item, index) in dataList" :key="index">
				<view @tap="open(item)"> 
					<text>{{item.title}}</text>
				</view>
			</view>
			<view>{{page_text}}</view>
			</view>
			<view v-else>
				暂无内容
			</view>
		</view>
	</view>
</template>

<script>
	import base from '@/common/base.js'; 
	export default {
		data() {
			return {
				 dataList: [],
				 page:'',
				 limit:'',
				 page_text:""
	
	
			}
	
		},
		onLoad() { 
			 var _this = this;
			 _this.get_notice_list();
		},
		
	   methods: {
			open(item){
				var id = item.id;
				uni.navigateTo({
					url: '/pages/helpdetail/helpdetail?id='+id
				})
			},
			 get_notice_list() {
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
				 	url: web_site + '/api/help/index',
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
				 		page: page,
				 		limit: 15
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
				 				var invite_list = _this.dataList;
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
