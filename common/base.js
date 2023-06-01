import md5 from '@/common/md5.js';
module.exports = {
	get_time: function() {
		var current_time = Date.parse(new Date());
		current_time /= 1000;
		return current_time;
	},
	get_app_key: function(secret, key,rand_num, time) {  
		return md5.start(md5.start(md5.start(secret + key)+rand_num) + time);
		 
	},
	get_rand_num: function(n) {
		if (n > 21) return null;
		return parseInt((Math.random() + 1) * Math.pow(10, n - 1));
	},
	get_fill_time: function(val) {
		if (val < 10) val = '0' + val;
		return val;
	},
	member_login_check() {
		//uni.setStorageSync('member_id','');
		var member_id = uni.getStorageSync('member_id');
		if (member_id == undefined || member_id == "" || member_id <= 0) {
			// uni.navigateTo({
			// 	url: '/pages/login/login'
			// });
			return false;
		} else {
			return true;
		}
	},
	get_client_type() {
		var type = uni.getSystemInfoSync().platform;
		type = type.toLowerCase();
		//订单来源1：PC，2：手机网页，3：AppAndroid，4：AppIOS，5：公众号，6：微信小程序，7：支付宝小程序，8：百度小程序，9：头条小程序
		var value = '';
		if (type == 'ios') {
			value = 3;
		} else if (type == 'android') {
			value = 4;
		}
		return value;
	},
	htmlspecialchars_decode(str) {
		str = str.replace(/<table[^>]*>\s*/gi, '');
		str = str.replace(/<tbody[^>]*>\s*/gi, '');
		str = str.replace(/<tr[^>]*>\s*/gi, '');
		str = str.replace(/<td[^>]*>\s*/gi, '');
		str = str.replace(/<\/td>\s*/gi, '');
		str = str.replace(/<\/tr>\s*/gi, '');
		str = str.replace(/<\/tbody>\s*/gi, '');
		str = str.replace(/<\/table>\s*/gi, '');
		str = str.replace(/&amp;/gi, '&');
		str = str.replace(/&lt;/gi, '<');
		str = str.replace(/&gt;/gi, '>');
		str = str.replace(/&quot;/gi, "''");
		str = str.replace(/&#039;/gi, "'");
		str = str.replace(/amp;/gi, '');
		str = str.replace(/&nbsp;/gi, ' ');
		str = str.replace(/nbsp;/gi, '');
		str = str.replace(/<div>\s*<\/div>/gi, '');
		return str;
	}
}
