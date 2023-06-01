<script>
	import base from '@/common/base.js';
 export default {
		 globalData: {  
		       web_site: 'https://crm.hnzhuofeng.cn',  
			   secret:"",
			   key:"",
		    },
	    onLaunch: function() {
			 var secret = uni.getStorageSync('secret');
			 var key = uni.getStorageSync('key');
			 this.globalData.secret = secret;
			 this.globalData.key = key;
		 }
	}	 
</script>

<style>
	/*每个页面公共css */
	 .clearit::after{content:""; display:block; height:0px; visibility:hidden; clear:both; } 
</style>
