<template>
	<view class="content">
		<view class="index_notice">
			
			     <view class="index_notice_box">姓名：{{name}}</view>
				 <view class="index_notice_box">电话：{{mycall}}</view>
				 <view class="index_notice_box">地址：{{address}}</view>
				 <view class="index_notice_box">留言内容：{{lytext}}</view>
				 <view class="index_notice_box">留言时间：{{time}}</view>
				 <view class="index_notice_box">留言来源：{{source_name}}</view>
				 <view class="index_notice_box">网站名称：{{web_name}}</view>
				 <view class="index_notice_box">网站域名：{{web_site}}</view>
				 
			 
		</view>
		
	</view>
</template>

<script>
	import base from '@/common/base.js'; 
	export default {
		data() {
			return {
			 name:"",
			 mycall:"",
			 address:"",
			 lytext:"",
			 time:"",
			 source_name:"",
			 web_name:"",
			 web_site:"",
		  }
	
		},
		 
		onShareAppMessage(res) {
			return {}
		},
	  
	  
		methods: {
			
		 onLoad(e) { 
		 	 var id = e.id;
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
		 	 	url: web_site + '/api/website/get_message_view',
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
					id:id
		 	 	},
		 	 	success: res => {
		 	 		var result = res.data;
		 	 		var data = result.data; 
					console.log(result)
		 	 		if (result.code == '0') {
					 
		 				_this.name = data.name;
		 				_this.mycall = data.mycall;
		 				_this.address = data.address;
		 				_this.lytext = data.lytext;
		 				_this.time = data.time;
						_this.source_name = data.source_name;
						_this.web_name = data.web_name;
						_this.web_site = data.web_site;
		 	 		} else if (result.code == '1') {
		 	 			uni.showToast({
		 	 				title: '信息不存在',
		 	 				icon: 'none'
		 	 			});
		 	 		}
		 	 	}
		 	 });
		 	  
		  }

		}
	}
</script>

<style lang="scss">
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
