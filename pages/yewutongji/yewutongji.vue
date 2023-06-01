<template>
	<view class="content">
		<!--<view v-if="type == 1">-->
			<view class="yewutongji">
				<view class="yewutongji_top">
					<view class="yewutongji_top_li">
						<view>{{clientNumber}}</view>
						<text class="text">新增</text>
					</view>
					<view class="yewutongji_top_li">
						<view>{{successNumber}}</view>
						<text class="text">签单</text>
					</view>
					<view class="yewutongji_top_li">
						<view>{{failNumber}}</view>
						<text class="text">失败</text>
					</view>
					<view class="yewutongji_top_li">
						<view>{{genjinNumber}}</view>
						<text class="text">跟进</text>
					</view>
					<view class="yewutongji_top_li">
						<view><text>￥</text>{{sellingMoney}}</view>
						<text class="text">营业额</text>
					</view>
				</view>
				<view class="yewutongji_bottom">
					<view class="yewutongji_bottom_li">
						<view class="title">当月开发客户</view>
						<view class="shuzi"><text>{{monthClientNumber}}</text>个</view>
					</view>

					<view class="yewutongji_bottom_li">
						<view class="title">当月签单数量</view>
						<view class="shuzi"><text>{{monthSuccessNumber}}</text>个</view>
					</view>
					<view class="yewutongji_bottom_li">
						<view class="title">当月失败客户数量</view>
						<view class="shuzi"><text>{{monthFailNumber}}</text>个</view>
					</view>

					<view class="yewutongji_bottom_li">
						<view class="title">当月回访数量统计</view>
						<view class="shuzi"><text>{{monthClientLogNumber}}</text>个</view>
					</view>
					<view class="yewutongji_bottom_li">
						<view class="title">当月销售额</view>
						<view class="shuzi">￥<text>{{monthSellingMoney}}</text></view>
					</view>

					<view class="yewutongji_bottom_li">
						<view class="title">本月与上月对比</view>
						<view class="shuzi"><text>{{thisMonth2LastMonth}}</text>个</view>
					</view>
				</view>
			</view>
		<!--</view>


		<view v-if="type == 2">
			<view class="yewutongji">
				<view class="yewutongji_top">
					<view class="yewutongji_top_li">
						<view>{{totalClientNumber}}</view>
						<text class="text">新增</text>
					</view>
					<view class="yewutongji_top_li">
						<view>{{totalSuccessNumber}}</view>
						<text class="text">签单</text>
					</view>
					<view class="yewutongji_top_li">
						<view>{{totalFailNumber}}</view>
						<text class="text">失败</text>
					</view>
					<view class="yewutongji_top_li">
						<view>{{totalGenjinNumber}}</view>
						<text class="text">跟进</text>
					</view>
					<view class="yewutongji_top_li">
						<view><text>￥</text>{{totalSelling}}</view>
						<text class="text">营业额</text>
					</view>
				</view>

				<view class="yewutongji_bottom">

					<view class="yewutongji_bottom_li" v-for="(item,index) in userList" :key="index">
						<view class="title">{{item.name}}</view>
						<text>客户：{{item.client_number}}</text>
						<text>签单：{{item.success_number}}</text>
						<text>失败：{{item.fail_number}}</text>
						<text>跟进：{{item.genjin_number}}</text>
						<view class="shuzi">营业额：<text>{{item.selling_money}}</text></view>

					</view>
				</view>

			</view>
		</view>


		<view v-if="type == 3">
			<view class="yewutongji">
				<view class="yewutongji_top">
					<view class="yewutongji_top_li">
						<view>{{totalClientNumber}}</view>
						<text class="text">新增</text>
					</view>
					<view class="yewutongji_top_li">
						<view>{{totalSuccessNumber}}</view>
						<text class="text">签单</text>
					</view>
					<view class="yewutongji_top_li">
						<view>{{totalFailNumber}}</view>
						<text class="text">失败</text>
					</view>
					<view class="yewutongji_top_li">
						<view>{{totalGenjinNumber}}</view>
						<text class="text">跟进</text>
					</view>
					<view class="yewutongji_top_li">
						<view><text>￥</text>{{totalSelling}}</view>
						<text class="text">营业额</text>
					</view>
				</view>
				<view class="yewutongji_bottom">
					<view class="yewutongji_bottom_li" v-for="(item,index) in teamList" :key="index">
						<view class="title">{{item.team_name}}</view>
						<text>客户：{{item.client_number}}</text>
						<text>签单：{{item.success_number}}</text>
						<text>失败：{{item.fail_number}}</text>
						<text>跟进：{{item.genjin_number}}</text>
						<view class="shuzi">营业额：<text>{{item.selling_money}}</text></view>
					</view>
				</view>
			</view>
		</view>
-->

	</view>
</template>

<script>
	import base from '@/common/base.js';
	export default {

		data() {
			return {

				//type: "",
				//totalClientNumber: "",
				//totalSuccessNumber: "",
				//totalFailNumber: "",
				//totalGenjinNumber: "",
				//totalSelling: "",
				//userList: [],
				//teamList: [],
				clientNumber: "", //客户数量
				successNumber: "", //签单数量
				failNumber: "", //失败数量
				genjinNumber: "", //跟进数量
				sellingMoney: "", //营业额
				monthClientNumber: "", //当月开发客户
				monthSuccessNumber: "", //当月签单
				monthFailNumber: "", //当月失败
				monthClientLogNumber: "", //当月回访
				monthSellingMoney: "", //当月销售额
				thisMonth2LastMonth: "" //本月与上月对比

			}
		},
		onLoad(e) {

		},
		onShow() {

			var _this = this;

			this.get_user_selling();

		},

		methods: {

			/*get_info() {
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
						var data = result.data;
						console.log(data)
						console.log(result)
						if (result.code == '0') {
							_this.type = data.type;
							if (_this.type == 2) {
								_this.get_team_selling()
							} else if (_this.type == 1) {
								_this.get_user_selling()
							} else if (_this.type == 3) {
								_this.get_leader_selling()
							}
						}

					}
				})
			},


			get_team_selling() {
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				var user_id = uni.getStorageSync('member_id');
				uni.request({
					url: web_site + '/api/clientlog/get_team_selling',
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
						uid: uid,
						user_id: user_id
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
						if (result.code == '0') {
							_this.totalClientNumber = data.totalClientNumber;
							_this.totalSuccessNumber = data.totalSuccessNumber;
							_this.totalFailNumber = data.totalFailNumber;
							_this.totalGenjinNumber = data.totalGenjinNumber;
							_this.totalSelling = data.totalSelling;
							_this.userList = data.userList;
						}
					}
				})
			},
			get_leader_selling() {
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				var user_id = uni.getStorageSync('member_id');
				uni.request({
					url: web_site + '/api/clientlog/get_leader_selling',
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
						uid: uid,
						user_id: user_id
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
						if (result.code == '0') {
							_this.totalClientNumber = data.totalClientNumber;
							_this.totalSuccessNumber = data.totalSuccessNumber;
							_this.totalFailNumber = data.totalFailNumber;
							_this.totalGenjinNumber = data.totalGenjinNumber;
							_this.totalSelling = data.totalSelling;
							_this.teamList = data.teamList;
						}
					}
				})
			},
			
			
			*/
			get_user_selling() {
				uni.showLoading({
				   title: '加载中',
				 });
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				var user_id = uni.getStorageSync('member_id');
				uni.request({
					url: web_site + '/api/clientlog/get_user_selling',
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
						uid: uid,
						user_id: user_id
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
						if (result.code == '0') {
							_this.clientNumber = data.clientNumber == '' ? '--': data.clientNumber;
							_this.successNumber = data.successNumber == '' ? '--': data.successNumber;
							_this.failNumber = data.failNumber == '' ? '--': data.failNumber;
							_this.genjinNumber = data.genjinNumber == '' ? '--': data.genjinNumber;
							_this.sellingMoney = data.sellingMoney == '' ? '--': data.sellingMoney;
							_this.monthClientNumber = data.monthClientNumber == '' ? '--': data.monthClientNumber;
							_this.monthSuccessNumber = data.monthSuccessNumber == '' ? '--': data.monthSuccessNumber;
							_this.monthFailNumber = data.monthFailNumber == '' ? '--': data.monthFailNumber;
							_this.monthClientLogNumber = data.monthClientLogNumber == '' ? '--': data.monthClientLogNumber;
							_this.monthSellingMoney = data.monthSellingMoney == '' ? '--': data.monthSellingMoney;
							_this.thisMonth2LastMonth = data.thisMonth2LastMonth == '' ? '--': data.thisMonth2LastMonth;
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
			
		}
	}
</script>

<style lang="scss">
	.yewutongji {
		width: 100%;
		height: 100%;
		position: fixed;
		background: #f3f6ff;

		.yewutongji_top {
			width: 90%;
			margin: 0 auto;
			background: #3c69ea;
			margin-top: 20px;
			display: flex;
			padding: 20px 0;
			border-radius: 5px;

			.yewutongji_top_li {
				flex: 0 0 17.5%;
				color: #fff;

				view {
					font-size: 18px;
					text-align: center;
					font-weight: bold;

					text {
						font-size: 14px;
					}
				}

				.text {
					margin-top: 5px;
					display: block;
					font-size: 12px;
					text-align: center;
				}
			}

			.yewutongji_top_li:last-child {
				flex: 0 0 30%;
			}
		}

		.yewutongji_bottom {
			width: 90%;
			margin: 0 auto;
			margin-top: 15px;
			display: flex;
			flex-wrap: wrap;

			.yewutongji_bottom_li {
				flex: 0 0 48%;
				background: #fff;
				margin-bottom: 2%;
				border-radius: 5px;
				padding: 10px;
				box-sizing: border-box;

				.title {
					font-size: 16px;
					position: relative;
					padding-left: 10px;
					margin-bottom: 10px;
				}

				text {
					 
					font-size: 14px;
					line-height: 28px;
					color: #545445;
					display: inline-block;
				}

				.title::after {
					content: "";
					width: 5px;
					height: 15px;
					position: absolute;
					left: 0;
					top: 4px;
					background: #3c5dd6;
					border-radius: 3px;
				}

				.shuzi {
					font-size: 14px;
					color: #333;

					text {
						font-size: 18px;
						color: #e95800;
						font-weight: bold;
						display: inline-block;
						margin-right: 5px;
					}
				}
			}

			.yewutongji_bottom_li:nth-of-type(even) {
				margin-left: 1%;
			}

			.yewutongji_bottom_li:nth-of-type(odd) {
				margin-right: 1%;
			}

			.yewutongji_bottom_kuai {
				flex: 0 0 4%;
			}
		}
	}
</style>
