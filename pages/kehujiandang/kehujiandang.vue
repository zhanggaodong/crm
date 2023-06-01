<template>
	<view class="content">

		<form @submit="formSubmit">
			<view class="form-container-box">
				<!-- 待用活动表单 -->

				<!-- 单行文本框  -->
				<view class="kehujiandang_pic">
					<view class="kehujiandang_pic_no" @click="addImages" v-if="head_img.value==''">
						<view class="text">形象墙图片上传</view>
						<view class="iconfont icon-jiahao"></view>
					</view>

					<view class="kehujiandang_pic_img" v-else>
						<view class="images_box">
							<image :src="head_img.value" mode="aspectFill"></image>
							<view class="del" @click="del(index)">
								<view class="iconfont icon-guanbi"></view>
							</view>
						</view>
					</view>

				</view>

				<view class="form-container">
					<view class="form-box">
						<view class='line'>
							<view class="line-left clearit">
								<view class="t">客户姓名</view><text class="m">：</text><text class='colorRed' v-if="name_required==1">*</text>
							</view>
							<view class="line-right">
								<input type="text" class="input" placeholder-class="plaClass" v-model="name"></input>
							</view>
						</view>
						<view class='line'>
							<view class="line-left">
								<view class="t">手机</view><text class="m">：</text><text class='colorRed' v-if="mobile_required==1">*</text>
							</view>
							<view class="line-right">
								<input type="text" class="input" placeholder-class="plaClass" v-model="mobile"></input>
							</view>
						</view>
						<view class='line'>
							<view class="line-left">
								<view class="t">地址</view><text class="m">：</text><text class='colorRed' v-if="address_required==1">*</text>
							</view>
							<view class="line-right">
								<input type="text" class="input" placeholder-class="plaClass" v-model="address"></input>
							</view>
						</view>
					</view>
				</view>
				<active-form :formDate="formDate" @choose-image-btn="chooseImage" @delete-img-btn="deleteImg" @sure-btn="sure"
				 @checkbox-btn="cbt" @getDate-btn="getDate" @choose-image-yulan="chooseImageyulandatu"  @input-val="inputVal">
				</active-form>

				<button @click="show"  class="buttonBox" v-if="tixingquanxian == true" style="margin-top:10px;width:40%;font-size:12px;height:35px;line-height:35px;background: #666;">获取客户提醒权限</button>

				<view class="form-container" v-if="tixingneirong == true">
					<view class="form-box">
						<view class='line'>
							<view class="line-left clearit">
								<view class="t">提醒时间</view><text class="m">：</text><text class='colorRed'>*</text>
							</view>
							<view class="line-right" style="line-height: 100upx;">
								<dy-Date timeType="day" v-model="remind_time" @getData="getData" placeholder="请选择日期" minSelect="2000/01/01"
								 maxSelect="2025/12/31"></dy-Date>
							</view>
						</view>
						<view class='line'>
							<view class="line-left">
								<view class="t">一直提醒</view><text class="m">：</text><text class='colorRed'>*</text>
							</view>
							<view class="line-right" style="line-height: 100upx;">
								<switch @change="switch1Change" style="transform:scale(0.8)" color="#3c5dd6" />
							</view>
						</view>
						<view class='line'>
							<view class="line-left">
								<view class="t">提醒频率</view><text class="m">：</text><text class='colorRed'>*</text>
							</view>
							<view class="line-right" style="line-height: 100upx;">
								<radio-group @change="radio_zhuangtai" v-model="rate">
									<radio :checked="rate == 1" value="1" style="transform:scale(0.8)" color="#3c5dd6">1小时</radio>
									<radio :checked="rate == 2" value="2" style="transform:scale(0.8); margin-left: -10px;" color="#3c5dd6">2小时</radio>
									<radio :checked="rate == 3" value="3" style="transform:scale(0.8); margin-left: -10px;" color="#3c5dd6">3小时</radio>
									<radio :checked="rate == 4" value="4" style="transform:scale(0.8);margin-left: -10px" color="#3c5dd6">4小时</radio>
								</radio-group>
							</view>
						</view>
					</view>
				</view>
				<button form-type="submit" class="buttonBox" style="margin-top:15px;">立即提交</button>
			</view>
		</form>
	</view>
</template>


<script>
	import base from '@/common/base.js';
	export default {
		data() {
			return {
                head_img:"",
				showImage: 1,
				formDate: [],
				name: "",
				mobile: "",
				address: "",
				infos: [],
				remind_time: "",
				state: "",
				rate: "",
				cid: "", 
				tixingneirong: false,
				tixingquanxian: true,
				name_required:"",
				mobile_required:"",
				address_required:""
				
			}
		},
		onLoad() {
			var _this = this;
			_this.client_form_info();
			 _this.get_required_field()

		},
		onShow() {
		 	},

		methods: {
           show: function() {
				var that = this;
				uni.requestSubscribeMessage({
					tmplIds: ['rlCV7nO-mjDBHUChFGibauOY3k6rP_eM4mgc-hOFLdk'],
					success: (res) => {
					    if (res["rlCV7nO-mjDBHUChFGibauOY3k6rP_eM4mgc-hOFLdk"] == "accept") {
					        uni.showToast({
					        	title: '授权成功',
					        	icon: 'none'
					        });
					      this.tixingquanxian = false;
						  this.tixingneirong = true;
					   } else if(res["rlCV7nO-mjDBHUChFGibauOY3k6rP_eM4mgc-hOFLdk"] == "reject") {
					        uni.showModal({
					             title: '提示',
					             content: '取消将无法收到客户提醒，请谨慎选择',
					         });
					     }
					 },
                   fail(res) {
						console.log(res);
					},
					complete(res) {
						console.log(res);
					}
				})
			},
            del(index) {
				this.head_img.value = ""
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

			client_form_info() {
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
					url: web_site + '/api/client/client_form_info',
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
						uid: uid
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
						if (result.code == '0') {
							_this.formDate = data.form_list;
							_this.head_img = data.head_img; 
						} else if (result.code == '202') {
							uni.showToast({
								title: '用户被禁用',
								icon: 'none'
							});
						} else if (result.code == '201') {
							uni.showToast({
								title: '用户不存在',
								icon: 'none'
							});
						} else if (result.code == '101') {
							uni.showToast({
								title: '参数错误',
								icon: 'none'
							});
						}
					}
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)
			},
			
			//基本字段是否必填
			get_required_field() { 
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
					url: web_site + '/api/clientlog/get_required_field',
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
						uid: uid
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
						if (result.code == '0') { 
							_this.name_required = data.name_required;
							_this.mobile_required = data.mobile_required;
							_this.address_required = data.address_required;
						}  
					}
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 1000)
			},
			
		 
			
		 addImages: function() {
			    var _this = this;
			    uni.chooseImage({
				 count: 1,
				 sizeType: ['compressed'], //压缩图
				 success: function(chooseImageRes) {
					 const tempFilePaths = chooseImageRes.tempFilePaths;
					 _this.head_img.value = tempFilePaths[0]; 
				 }
			  });
		   },
		   formSubmit() {
				var that = this;
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				var formDate = this.formDate;
				var head_img = this.head_img;
				var name = this.name;
				var mobile = this.mobile;
				var address = this.address;
				var remind_time = this.remind_time;
				var rate = this.rate;
				var state = this.state;
				var formDate = this.formDate.map(({id,type,value}) => ({fid: id,type,value: Array.isArray(value) ? value.join(',') : value}));
				var infos = JSON.stringify(formDate);
				uni.request({
					url: web_site + '/api/client/add_client',
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
						name: name,
						infos: infos,
						mobile: mobile,
						address: address,
						remind_time: remind_time,
						state: state,
						rate: rate,
                     },
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
						if (result.code == '0') {
							uni.showToast({
								title: '添加完成',
								icon: 'none'
							})
							this.cid = data.id;
						    var formDatet = formDate;
						    for (var i = 0; i < formDatet.length; i++) { 
							 if(formDatet[i].type == 6 || formDatet[i].type == 7 && formDatet[i].value != '' && formDatet[i].value != undefined){
								 _this.file_upload(formDatet[i].type, formDatet[i].fid, formDatet[i].value);
							   }
							}
							var head_imgt = head_img;
							if(head_imgt.value != '' && head_imgt.value != undefined){
							   _this.file_upload(head_imgt.type, head_imgt.id, head_imgt.value);
							 }
							 setTimeout(function() {
							 	uni.navigateBack({
							 		delta: 1
							 	});
							 }, 2000);
							 return true;
						   } else {
							uni.showToast({
								title: result.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			 
			// 上传图片
			chooseImage: function(data) {
				var data = JSON.parse(data)
				this.formDate[data.index].value = data.value;
				this.formDate[data.index].updateImg = true;

			},
			//上传图片
			file_upload(type, fid, value) {
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				var cid = this.cid;
				var type = type;
				var fid = fid;
				var value = value; 
				const uploadTask = uni.uploadFile({
					url: web_site + '/api/client/add_client_file',
					fileType: 'image',
					filePath: value,
					name: 'file',
					formData: {
						rand_num: rand_num,
						time: time,
						sign: sign,
						key: key,
						secret: secret,
						uid: uid,
						type: type, 
						fid: fid,
						cid: cid
					},
					success: res => {}
				});
				uploadTask.onProgressUpdate(res => {
					console.log('上传进度' + res.progress);
					console.log('已经上传的数据长度' + res.totalBytesSent);
					console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
				});
             },
			// 删除图片
			deleteImg: function(index) {
				this.formDate[index].value = "";
				this.formDate[index].updateImg = false;
			},
			// 确定
			sure: function(data) {
				var data = JSON.parse(data);
				if (String(data.currentSelectIndex) != "" && String(data.currentSelectValue) != "") {
					this.formDate[data.currentSelectIndex].value = data.currentSelectValue;
				}
			},
			// 确定
			cbt: function(data) {
				var data = JSON.parse(data);
				console.log(data)
				if (String(data.val) != "") {
					this.formDate[data.index].value = data.val;
				}
				var values = data.val
				for (var i = 0; i < this.formDate[data.index].add_values.length; i++) {
					if (values.includes(this.formDate[data.index].add_values[i].value)) {
						this.$set(this.formDate[data.index].add_values[i], 'checkbox', true)
					} else {
						this.$set(this.formDate[data.index].add_values[i], 'checkbox', false)
					}
				}
			},
			getDate: function(data) {
				var data = JSON.parse(data);
				if (String(data.value) != "" && String(data.index) != "") {
					this.formDate[data.index].value = data.value;
				}
			},

			// inputVal
			inputVal: function(data) {
				var data = JSON.parse(data);
				if (String(data.val) != "" && String(data.index) != "") {
					this.formDate[data.index].value = data.val;
				}
			},
			chooseImageyulandatu: function(data) {
					  var data = JSON.parse(data)
					 var ids1 = data.value
					 var images_yulan1 = []; 
					 images_yulan1.push(ids1);
					 
					 console.log(images_yulan1)
					 uni.previewImage({
						 urls: images_yulan1,
						 longPressActions: {
						 itemList: ['发送给朋友', '保存图片', '收藏'],
								 success: function(data) {
								 console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							  },
						  fail: function(err) {
								  console.log(err.errMsg);
							  }
						  }
				  });  
			},

		}
	}
</script>


<style lang="scss">
	@import url("../../css/icon.css");

	.content {
		padding-bottom: 20px;
	}

	.kehujiandang_pic {
		margin-bottom: 15px;
	}

	.kehujiandang_pic_no {
		width: 90%;
		margin: 0 auto;
		padding: 50px 0;
		background: #e9e9e9;
		border-radius: 5px;
		text-align: center;

		.text {
			font-size: 14px;
			color: #a9a9a9;
			display: block;
			margin: 0 auto;
			text-align: center;
			margin-bottom: 10px;
		}

		.iconfont {
			font-size: 20px;
			color: #a9a9a9;

		}
	}

	.kehujiandang_pic_img {
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
		position: relative;

		image {
			width: 100%;
		}

		.del {
			width: 20px;
			height: 20px;
			border-radius: 50%;
			position: absolute;
			right: -8px;
			top: -8px;
			background: red;
			display: flex;
			align-items: center;
			justify-content: center;

			.iconfont {
				color: #fff;
				font-size: 8px;

			}
		}
	}

	.kehujiandang_form {
		width: 90%;
		margin: 0 auto;

		.kehujiandang_form_1 {
			display: flex;
			height: 45px;
			line-height: 45px;
			border-bottom: 1px solid #eaeaea;
			font-size: 14px;

			picker {
				flex: 1
			}

			input {
				flex: 1;
				height: 45px;
				line-height: 45px;
			}
		}

		.kehujiandang_form2 {
			margin-top: 15px;

		}
	}

	.buttonBox {
		width: 70%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		border-radius: 25px;
		text-align: center;
		margin: 0 auto;
		margin-top: 30px;
		background-image: linear-gradient(to right, #2091f1, #3c5dd6);
		color: #fff;
	}


	.form-container {
		width: 90%;
	    margin: 0 auto;

		.form-box {
			width: 100%;
			box-sizing: border-box;
		}

		.colorRed {
			color: red;
			line-height: 50px;
			height: 50px;
		}

		.m {

			line-height: 50px;
			height: 50px;
		}

		.img-box {
			border-bottom: 1px solid #ededed;
			padding: 30upx 0;

			.update-img-box {
				border: 1px solid #ededed;
				display: flex;

				.update-img {
					width: 140upx;
					height: 140upx;
				}
			}

			.update-img-box2 {
				overflow: hidden;
				display: flex;
			}

			.update-img-box,
			.update-btn-box {
				width: 140upx;
				height: 140upx;
				position: relative;
				margin-top: 20upx;
			}

			.update-img-box .close-img {
				width: 40upx;
				height: 40upx;
				position: absolute;
				right: -12upx;
				top: -16upx;
				background: #fff;
				border-radius: 50%;
			}

			img {
				width: 140upx;
				height: 140upx;
				object-fit: cover;
			}
		}

		.line-right {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;

			dy-Date {
				font-size: 14px;
				height: 100upx;
				color: #666
			}
		}

		.send-code-box {
			.send-code {
				font-size: 28upx;
				padding: 0;
				white-space: nowrap;
				// width: 60%;
				//color:#ff5b01;
				height: 90upx;
				line-height: 90upx;
				cursor: pointer;
			}
		}

 

		.line-left {

			width: 25%;
			align-items: center;
			text-align: left;
			justify-content: center;
			height: 100upx;
			font-size: 28upx;
			color: #333;
			box-sizing: border-box;

			.t {
				display: inline-block;
				text-align: justify;
				text-align-last: justify;
				justify-content: space-between;
				width: 58px;
				line-height: 50px;
				height: 50px;
				float: left;
			}

			.t::after {
				width: 100%;
				display: inline-block;
				content: ''; //这三个都不可以少
			}

		}




		.img-label {
			width: 100%;
			height: 100%;
			font-size: 28upx;
			color: #333;
			box-sizing: border-box;
		}

		.p-l14 {
			padding-left: 14upx;
		}

		.textarea-box {
			// display: flex;
			border-bottom: 1px solid #ededed;
			padding-top: 20upx;

			// align-items: center;
			textarea {
				height: 150upx;
				font-size: 28upx;
				color: #333;
				width: 100%;
				margin-top: 20upx;
			}
		}

		.line {
			margin-top: 30upx;
			width: 100%;
			margin: 0 auto;
			border-bottom: 1px solid #ededed;
			display: flex;
			overflow: hidden;

			.input {
				padding-right: 20upx;
				height: 100upx;
				width: 100%;
				text-align: left;
				font-size: 28upx;
				color: #333;
				border: none;
				overflow: hidden;
				text-overflow: ellipsis;
				outline: none;
			}
		}
	}
</style>
