<template>
	<view class="content">

		<view class="kehuguanli_box">
			<view class="tab_top is-fixed">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#3c5dd6"></uni-segmented-control>
			</view>
			<view class="kehuxiangqing">
				<view v-if="current === 0">
				    
				    					<view class="kehugenjin">
				    						<view v-show="wuneirong" class="wuneirong">
				    							- 暂无内容 -
				    						</view>
				    						<view v-show="youneirong">
				    							<view v-for="(item,index) in kehugenjin" :key="index" class="kehugenjin_box">
				    								<view class="kehugenjin_1">
				    									<view class="time">{{item.time}}</view>
				    									<view class="del" @tap="shanchu(item)">[删除]</view>
				    								</view>
				    								<view class="kehugenjin_2">
				    									 
				    									<view class="kehugenjin_2_t">
				    										<text>跟进反馈</text>
				    										<view class="kehugenjin_fankui">{{item.remark}}</view>
				    									</view>
				    									<view class="kehugenjin_2_t">
				    										<text>跟进资料</text>
				    										<view class="genjincailiao" @click="yulanImg(item)">
				    											<view class="genjin_img" v-for="fileList in item.fileList" :key="fileList.id">
				    												<view class="images_box">
				    													<image :src="fileList" mode="aspectFill"></image>
				    												</view>
				    											</view>
				    										</view>
				    									</view>
				    								</view>
				    							</view>
				    						</view>
				    					</view>
				    					<view class="genjin_gengxin">
				    						<view class="gengxin_title">更新客户填写</view>
				    						<form @submit="formSubmit_genjin">
				    							<view class="gengxin_list">
				    								<view class="gt">跟进时间：</view>
				    								<view class="date_item">
				    									<dy-Date timeType="day"  @getData="getData_gengxin" placeholder="请选择日期" minSelect="2000/01/01"
				    									 maxSelect="2025/12/31"></dy-Date>
				    								</view>
				    							</view>
				    							 
				    							<view class="gengxin_list">
				    								<view class="gt">跟进反馈：</view>
				    								<textarea auto-height v-model="log_remark" />
				    					      </view>
				    					  <view class="gengxin_list gengxin_list_child">
				    						<view class="gt">跟进资料：</view>
				    						
				    						<view class="genjincailiao">
				    							<view class="genjin_img" v-for="(item,index) in imagesList" :key="index">
				    								<view class="images_box">
				    									<image :src="item.url" mode="aspectFill"></image>
				    									<view class="del" @click="delList(index)">
				    										<view class="iconfont icon-guanbi"></view>
				    									</view>
				    								</view>
				    							</view>
				    					  <view class="genjin_noimg">
				    						  <view @click="addImagesList">
				    						  <image src="../../static/update_btn.png"></image>
				    					  </view>
				    				   </view>
				    				  </view>
				    			  </view>
				    		 <button  form-type="submit">立即提交</button>
				    	 </form>
				    </view>
				    				
				</view>
				<view v-if="current === 1">
					
					<form @submit="formSubmit">
						<view class="kehujiandang_pic">
							<view class="kehujiandang_pic_no" @click="addImages" v-if="head_img.value==''">
								<view class="text">形象墙图片上传</view>
								<view class="iconfont icon-jiahao"></view>
							</view>
					
							<view class="kehujiandang_pic_img" v-else>
								<view class="images_box">
									<image :src="head_img.value" @click="yulandatu(head_img.value)" mode="aspectFill"></image>
									<view class="del" @click="del(index)">
										<view class="iconfont icon-guanbi"></view>
									</view>
								</view>
							</view>
						</view>
						<view class="form-container-box">
							<!-- 待用活动表单 -->
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
							 @checkbox-btn="cbt" @choose-image-yulan="chooseImageyulandatu" @input-val="inputVal">
							</active-form>
							<button form-type="submit" class="buttonBox" style="width: 80%; margin: 0 auto; margin-top: 30px;">立即提交</button>
						</view>
					</form>
								
				
				
				</view>
			   <view v-if="current === 2">
				  <view class="qianyue_box">
						<form @submit="formqianyue">
						<view class="qianyue_box_1">
							<view class="qianyue_list">
								<view class="text">合同签订时间:</view>
								<view class="date_item">
									<dy-Date timeType="day" :childValue="contract_time" v-model="contract_time" @getData="contract_time_1" placeholder="请选择日期" minSelect="2000/01/01" maxSelect="2025/12/31"></dy-Date>
								</view>
							</view>
							<view class="qianyue_list">
								<view class="text">项目金额:</view>
								<input type="text" v-model="money" placeholder-style="color:#b5b8c2" placeholder="请输入项目金额" />
							</view>
							<view class="qianyue_list">
								<view class="text">服务时间:</view>
								<view class="date_item">
									<dy-Date placeholder="起始日期"   v-model="server_begin_time" :childValue="server_begin_time" :minSelect="from_minSelect" :maxSelect="from_maxSelect"
									 :iconshow="false" @getData="server_begin_time_1"></dy-Date>
								</view>
								<view class="filter_inputline"></view>
								<view class="date_item" style="text-align: right;">
								  <dy-Date placeholder="结束日期" v-model="server_end_time" :minSelect="to_minSelect" :childValue="server_end_time" :maxSelect="to_maxSelect" :iconshow="false"
									 @getData="server_end_time_1"></dy-Date>
								</view>
							</view>
							<!-- <view class="qianyue_list">
								<view class="text">金额分期缴纳:</view>
								<radio-group @change="fenqiChange" v-model="is_installment">
									<radio :checked="is_installment == 1" value="1" color="#3c5dd6">是</radio>
									<radio :checked="is_installment == 0" :disabled="is_installment == 1" value="0" color="#3c5dd6">否</radio>
								</radio-group>
							</view> -->
						 </view>
						<!-- <view v-if="is_installment==1">
							   	<view v-for="(item,index) in fenqilist" :key="index" class="fenqi_box">
							 		<view class="kehugenjin_1">
							 			<view class="time">第{{index+1}}期</view>
							 			<view class="del" @tap="gengxin(item)" @click="gengxin_tanchuang">[更新]</view>
							 		</view>
							 		<view class="kehugenjin_2">
							 			<view class="kehugenjin_2_t">
							 				<text>金额：</text>
							 				<view class="view">{{item.fee}}</view>
							 			</view>
							 			<view class="kehugenjin_2_t">
							 				<text>备注：</text>
							 				<view class="view">{{item.remark}}</view>
							 			</view>
							 			<view class="kehugenjin_2_t">
							 				<text>是否到账：</text>
							 			   <view class="view">{{['否', '是'][item.is_received]}}</view>
							 			</view>
							            <view class="kehugenjin_2_t" v-if="item.is_received == 1">
							          <text>到账时间：</text>
							        <view>{{item.receivedTime}}</view>
							      </view>
								</view>
							</view>
						<button @click="tianjiafenqi" style="margin-top:10px;width:40%;font-size:12px;height:35px;line-height:35px;background: #666;">添加分期</button>
					 </view> -->
							 
				 <!--添加分期弹窗-->
					 <view class="fenqi_tanchuang" v-if="fenqi_tanchuang == true">
						  <view class="fenqi_tanchuang_zhezhao">
							  <view class="fenqi_tanchuang_zhezhao_box">
							 <view class="genjin_gengxin">
							   <view class="gengxin_title">分期信息填写</view>
							  	<form  @submit="formSubmit_fenqi">
							  	
							  	<view class="gengxin_list">
							  		<view>分期金额：</view>
							  		<input type="text" v-model="fee" />
							  	</view>
							  	<view class="gengxin_list">
							  		<view>备注信息：</view>
							  		<textarea  auto-height v-model="remark" />
							   	</view>
							   <view class="qianyue_list">
							   	<view class="text">是否到账:</view>
							   	<radio-group @change="daozhangChange" v-model="is_received">
							   		<radio :checked="is_received == 1" value="1" color="#3c5dd6">是</radio>
							   		<radio :checked="is_received == 0" value="0" color="#3c5dd6">否</radio>
							   	</radio-group>
							   </view>
							   <view class="gengxin_list">
							   	<view>到账时间：</view>
							   	<view class="date_item">
							   		<dy-Date timeType="day" :childValue="receivedTime" v-model="received_time" @getData="received_time_1" placeholder="请选择日期" minSelect="2000/01/01" maxSelect="2025/12/31"></dy-Date>
							   	</view>
							   </view>
							    <button  form-type="submit" style="margin-top: 20px;">立即提交</button>
							   </form>
							  </view>
						    <view @click="fenqitanchuang_close" class="iconfont icon-guanbi"></view>
						  </view>
					  </view>
					</view>  
						
						<!--更新分期弹窗-->
						
				<view class="fenqi_tanchuang" v-if="fenqi_tanchuang_dantiao == true">
					<view class="fenqi_tanchuang_zhezhao">
					 <view class="fenqi_tanchuang_zhezhao_box">
						 <view class="genjin_gengxin">
							 <view class="gengxin_title">更新数据</view>
								<form  @submit="formSubmit_fenqi_gengxin(fid)">
									<view class="gengxin_list">
									   <view>分期金额：</view>
										<input type="text" v-model="fee" />
									 </view>
									 <view class="gengxin_list">
										  <view>备注信息：</view>
										  <textarea  auto-height v-model="remark" />
									 </view>
									 <view class="qianyue_list">
										 <view class="text">是否到账:</view>
										 <radio-group @change="daozhangChange" v-model="is_received">
										    <radio :checked="is_received == 1" value="1" color="#3c5dd6">是</radio>
											 <radio :checked="is_received == 0" value="0" color="#3c5dd6">否</radio>
										 </radio-group>
									   </view>
									  <view class="gengxin_list">
										 <view>到账时间：</view>
										 <view class="date_item">
										    <dy-Date timeType="day" :childValue="receivedTime" v-model="receivedTime" @getData="received_time_1" placeholder="请选择日期" minSelect="2000/01/01" maxSelect="2025/12/31"></dy-Date>
										</view>
									 </view>
									<button  form-type="submit" style="margin-top: 20px;">立即提交</button>
								 </form>
									 </view>
								  <view @click="fenqitanchuang_close_dantiao" class="iconfont icon-guanbi"></view>
					          </view>
							   </view>
							 </view>  
						 <button  form-type="submit" style="margin-top: 20px;">立即提交</button>
					  </form>
					</view>
				 </view>
				<view v-if="current === 3">
					<view class="zhuangtai">
						<form @submit="form_zhuangtai">
						<view class="zhuangtai_list">
						  <view class="zhuangtai_t">客户状态:</view>
								<radio-group @change="radio_zhuangtai"  v-model="status">
									<radio :checked="status == 1" :disabled="disabled1" value="1" color="#3c5dd6">跟进中</radio>
									<radio :checked="status == 2" :disabled="disabled2" value="2" color="#3c5dd6">已签约</radio>
									<radio :checked="status == 3" :disabled="disabled3" value="3" color="#3c5dd6">失败客户</radio>
								</radio-group>
						 </view>
						 <view class="zhuangtai_list"  v-if="status==2">
						   <view class="zhuangtai_t">&nbsp;</view>
						 		<radio-group  @change="radio_genjiin" v-model="success_status">
						 			<radio :checked="success_status == 1" value="1" color="#3c5dd6">服务中</radio>
						 			<radio :checked="success_status == 2" value="2" color="#3c5dd6">项目完成</radio>
						 			<radio :checked="success_status == 3" value="3" color="#3c5dd6">开设发票</radio>
						 		</radio-group>
						  </view>
						  <view class="zhuangtai_list"   v-if="status==3">
						    <view class="zhuangtai_t">&nbsp;</view>
						  		<radio-group  @change="radio_shibai" v-model="fail_status">
						  			<radio :checked="fail_status == 1" value="1" color="#3c5dd6">无效客户</radio>
						  			<radio :checked="fail_status == 2" value="2" color="#3c5dd6">流失客户</radio> 
						  		</radio-group>
						   </view>
						   <view class="zhuangtai_list"  v-if="status==1">
						     <view class="zhuangtai_t">客户标签：</view>
						   		<input type="text" v-model="tag" />
						    </view>
							<view class="zhuangtai_list"   v-if="status==1">
							  <view class="zhuangtai_t">进入公海：</view>
									<radio-group  @change="radio_group" v-model="group">
										<radio :checked="group == 1" value="1" color="#3c5dd6">团队公海</radio>
										<radio :checked="group == 2" value="2" color="#3c5dd6">公司公海</radio> 
									</radio-group>
							 </view>
							 <view class="zhuangtai_list"  v-if="show == 1 && group == 1">
							 	<view class="zhuangtai_t">选择团队：</view>
							 	<picker @change="bindPickerChange" :range="team_list" :range-key="'name'" :value="index" style="flex: 1;">
							 		<view class="uni-input">{{team_list[index].name}}</view>
							 	</picker>
							 </view>
						 <button form-type="submit"   style="margin-top: 20px;">立即提交</button>
					</form>
					</view>
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
				items: ['客户跟进', '客户资料', '客户签约', '客户状态'],
				current: 0,
				formDate: [],
				head_img:"", 
				name: "",
				mobile: "",
				address: "",
				id:"",
				kid:"",//用户ID 
				log_time:"",//更新跟进客户时间
				//log_address:"",//跟进地址
				log_remark:"",//跟进反馈
				imagesList:[],
				fileList:[],//获取跟进文件
				log_id:"",//跟进记录id
				wuneirong:true,
				youneirong:false,
				
				money:"",//合同金额
				contract_time:"",//合同时间
				server_begin_time:"",//服务开始时间
				server_end_time:"",//服务结束时间
				is_installment:"",//是否分期
				
				
				received_time:"",//分期到账时间,
				is_received:"",//是否到账
				fee:"",//分期金额
				remark:"",//分期备注信息
				fid:"",
				disabled1:false,
				disabled2:false,
				disabled3:false,
				
				from_minSelect: '1900/01/01',
				from_maxSelect: '2050/12/31',
				to_minSelect: '1900/01/01',
				to_maxSelect: '2050/12/31', 
				zhuangtai:1,
				fenqi_tanchuang:false,
			    fenqi_tanchuang_dantiao:false,
				fenqilist: [],
				kehugenjin: [],
				fenqilist_dantiao:"",
				
				status:"",
				group:"",
				tag:"",
				success_status:"",
				fail_status:"",
				show:"",
				team_list:[],
				index:0,
				tid:"",
				name_required:"",
				mobile_required:"",
				address_required:""

			}
		},
		 
		onLoad(e) { 
			this.kid = e.id;
			this.get_client_log() 
		  },

		methods: {
			
			onClickItem(e) {
				var _this = this;
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				var cid = this.kid
				if (this.current === 0) {
					 this.kehugenjin = [];
					 this.get_client_log() 
					 console.log(this.kid)
				  }
				if (this.current === 1) {
					 this.get_client_form_info();
					 this.get_required_field();
				  }
				if (this.current === 2) {
					  this.get_client_contract_info()
					 // this.get_client_fee()
					   console.log(this.kid)
				   }
				 if (this.current === 3) {
				 	  this.get_client_status_info()
					  console.log(this.kid)
				    } 
			  },
			 
			 
			 //预览动态form里的图片
		   chooseImageyulandatu: function(data) {
				   var data = JSON.parse(data)
			       var ids1 = data.value
				   var images_yulan1 = []; 
				   images_yulan1.push(ids1);
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
			 // 基本信息上传图片
			chooseImage: function(data) {
				var data = JSON.parse(data)
				this.formDate[data.index].value = data.value;
				this.formDate[data.index].updateImg = true;
				console.log(data.value)
			},
			// 基本信息删除图片
			deleteImg: function(index) {
				this.formDate[index].value = "";
				this.formDate[index].updateImg = false;
			},
			// 基本信息下拉确定
			sure: function(data) {
				var data = JSON.parse(data);
				if (String(data.currentSelectIndex) != "" && String(data.currentSelectValue) != "") {
					this.formDate[data.currentSelectIndex].value = data.currentSelectValue;
				}
			},
			// 基本信息多选确定
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
			 
			// 基本信息文本框
			inputVal: function(data) {
				var data = JSON.parse(data);
				if (String(data.val) != "" && String(data.index) != "") {
					this.formDate[data.index].value = data.val;
			    }
			},
			
			//形象图上传
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
			
			del(index) {
				this.head_img.value = ""
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
			
			
			  //获取客户基本信息
			 get_client_form_info(){
				uni.showLoading({
				   title: '加载中',
				 });
				var _this = this;
				var id = this.kid;
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
						id:id
					},
					success: res => {
						var result = res.data;
						var data = result.data; 
						console.log(result)
					 if (result.code == '0') {
						 
					   	    _this.formDate = data.form_list;
							_this.head_img = data.head_img;
							_this.name = data.info.name;
							_this.mobile = data.info.mobile;
							_this.address = data.info.address;
							
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
			//修改保存客户信息
			formSubmit() {
				uni.showLoading({
				   title: '提交中',
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
				var formDate = _this.formDate;
				var name = this.name;
				var mobile = this.mobile;
				var address = this.address;
				var remind_time = this.remind_time;
				var rate = this.rate;
				var state = this.state;
				var id = this.kid;
				var head_img = this.head_img;
			    var formDate = this.formDate.map(({id,type,value}) => ({fid: id,type,value: Array.isArray(value) ? value.join(',') : value}))
			    var infos = JSON.stringify(formDate)
			  
				uni.request({
					url: web_site + '/api/client/save_client_info',
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
						name: name,
						infos: infos,
						mobile: mobile,
						address: address,
					 },
					success: res => {
						var result = res.data;
						var data = result.data;
			            console.log(result)
						 if (result.code == '0') {
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							})
						  
						   var head_imgt = head_img;
							if(head_imgt.value != '' && head_imgt.value != undefined){
								_this.file_upload_index(head_imgt.type, head_imgt.id, head_imgt.value);
							}
							
						    var formDatet = formDate;
							for (var i = 0; i < formDatet.length; i++) { 
							 if(formDatet[i].type == 6 || formDatet[i].type == 7 && formDatet[i].value != '' && formDatet[i].value != undefined){
								 _this.file_upload_index(formDatet[i].type, formDatet[i].fid, formDatet[i].value);
							   }
							}
							
						 this.get_client_form_info()
						
						   } else {
							uni.showToast({
								title: result.msg,
								icon: 'none'
							});
						}
					}
				});
				setTimeout(function() {
				           uni.hideLoading();
				 }, 1000)
			},
			
			
			//上传图片
			file_upload_index(type, fid, value) {
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				var cid = this.kid;
				var type = type;
				var fid = fid;
				var value = value;  
			    uni.uploadFile({
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
					success: res => {
						console.log(res)
					    this.get_client_form_info()
						var result = res.data;
						if (result.code == '0') {
							uni.showToast({
								title: '上传成功',
								icon: 'none'
					     })
					   }else{
							uni.showToast({
								title: result.msg,
								icon: 'none'
							})
						}
					},
					fail: (res) => {
						console.log(res)
					}
				});
				// uploadTaskt.onProgressUpdate(res => {
				// 	console.log('上传进度' + res.progress);
				// 	console.log('已经上传的数据长度' + res.totalBytesSent);
				// 	console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
				// });
			 },
			
			
			
			//获取跟进记录
			get_client_log(){
				uni.showLoading({
				   title: '加载中',
				 });
				var _this = this;
				var id = this.kid;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;
				var secret = globalData.secret;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
			 
				uni.request({
					url: web_site + '/api/clientlog/get_client_log',
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
						client_id:id
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
					 if (result.code == '0') {
						   _this.youneirong = true;
						   _this.wuneirong = false;
					   	    _this.kehugenjin = data; 
						   _this.fileList = data.fileList;
						   
				      } else if (result.code == '201') {
						   uni.showToast({
								title: '用户不存在',
								icon: 'none'
						 });
						}else if (result.code == '1') {
						   _this.wuneirong = true;
						   _this.youneirong = false;
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
			getData_gengxin(value) {
				 this.log_time = value
			},
			
			 //跟进材料添加图片
			addImagesList: function() { 
				  uni.chooseImage({
					  count: 9, 
					  success: (res) => {
					   const tempFilePaths = res.tempFilePaths;
						  tempFilePaths.forEach((item,index)=>{
						  this.imagesList.push({
						    url:item
						  })
					    })
				     }
			     });
		   	 },
		  //跟进材料删除图片
			delList(index) {
				this.imagesList.splice(index,1)
			},
		 //删除跟进记录
			shanchu(item){
			   uni.showModal({
				 title: '删除记录',
				content: '您确定要删除跟进记录吗？',
				confirmColor: '#fd771e',
				success: res => {
					if (res.confirm) {
						var log_id = item.id
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
								url: web_site + '/api/clientlog/del_client_log',
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
								  log_id: log_id,
							 	},
							 success: res => {
								 var result = res.data;
								 console.log(result) 
								 if (result.code == '0') {
								 	 uni.showToast({
								 		 title: '删除成功',
								 		 icon: 'none'
								   })
								 this.get_client_log()
								  } else {
								  uni.showToast({
								 	 title: result.msg,
								 	 icon: 'none'
								 	 });
								  }
								 }
							  });
						    }
				       }
			      });
			 },
			
			
			 //提交跟进信息
			formSubmit_genjin() {
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
				var log_time = this.log_time;
				var log_remark = this.log_remark;
				var client_id =  this.kid; 
			    var imagesList = this.imagesList;
				console.log(imagesList)
				uni.request({
					url: web_site + '/api/clientlog/add_client_log',
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
						log_time: log_time,
						 
						log_remark: log_remark,
						client_id: client_id, 
			
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
			            if (result.code == '0') {
							uni.showToast({
								title: '提交成功',
								icon: 'none'
							})
							
						this.log_id = data;
						var imagesListt = imagesList;
						for (var i = 0; i < imagesListt.length; i++) { 
						 if(imagesListt[i].url != '' && imagesListt[i].url != undefined){
							 _this.file_upload_genjin(imagesListt[i].url);
						   }
						}	
					      this.get_client_log()	
					      this.log_time = "请选择日期";
						  this.log_remark = ""; 
						  this.imagesList = [];
						 
						} else {
							uni.showToast({
								title: result.msg,
								icon: 'none'
							});
						}
					}
				});
				setTimeout(function() {
				           uni.hideLoading();
				 }, 1000)
			},
			 
			 
			 //跟进材料上传图片
			 file_upload_genjin(file) {
			 	var _this = this;
			 	var globalData = getApp().globalData;
			 	var web_site = globalData.web_site;
			 	var key = globalData.key;;
			 	var secret = globalData.secret;;
			 	var time = base.get_time();
			 	var rand_num = base.get_rand_num(8);
			 	var sign = base.get_app_key(secret, key, rand_num, time);
			 	var uid = uni.getStorageSync('member_id');
			 	var log_id = this.log_id;
			 	console.log(log_id)
			 	const uploadTask = uni.uploadFile({
			 		url: web_site + '/api/clientlog/add_client_log_file',
			 		fileType: 'image',
			 		filePath: file,
			 		name: 'file',
			 		formData: {
			 			rand_num: rand_num,
			 			time: time,
			 			sign: sign,
			 			key: key,
			 			secret: secret,
			 			uid: uid,
			 			log_id: log_id, 
			 		 },
			 		success: res => {
			 			 var result = res.data
			 			  console.log(result)
					     this.get_client_log()
			 			if (result.code == '0') {
			 				uni.showToast({
			 					title: '上传成功',
			 					icon: 'none'
			 				})
						
			 			}else{
			 				uni.showToast({
			 					title: result.msg,
			 					icon: 'none'
			 				});
			 			}
			 		}
			 	});
			 	uploadTask.onProgressUpdate(res => {
			 		console.log('上传进度' + res.progress);
			 		console.log('已经上传的数据长度' + res.totalBytesSent);
			 		console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			 	});
			  },
			 //yulandatu
			 yulandatu: function(imageUrl) { 
				     var images_yulan = [];
				    images_yulan.push(imageUrl);
				    uni.previewImage({
						  urls: images_yulan,
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
			 
		   yulanImg: function(item) {
				   var ids = item.fileList
				    uni.previewImage({
						  urls: ids,
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
			  
			//获取签约信息
			get_client_contract_info(){
				uni.showLoading({
				   title: '加载中',
				 });
				var _this = this;
				var id = this.kid;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;
				var secret = globalData.secret;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				console.log(id) 
				uni.request({
					url: web_site + '/api/clientlog/get_client_contract_info',
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
						client_id:id
					},
					success: res => {
						var result = res.data;
						var data = result.data;
						console.log(result)
					 if (result.code == '0') {
					   	  
						  _this.contract_time = data.contract_time;
						  _this.money = data.money == 0.00 ? '': data.money;
						  _this.server_begin_time = data.server_begin_time;
						  _this.server_end_time = data.server_end_time;
						  _this.is_installment = data.is_installment;
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
			
			 //添加分期记录
			 gengxin_tanchuang(){
			 	var _this = this;
			 	_this.fenqi_tanchuang_dantiao = true;
			 },
			 //关闭分期弹窗
			 fenqitanchuang_close(){
			 	var _this = this;
			 	_this.fenqi_tanchuang = false
			 },
			 //关闭更新分期
			 fenqitanchuang_close_dantiao(){
			 	var _this = this;
			 	_this.fenqi_tanchuang_dantiao = false
			 },
			 
			//获取合作时间
			contract_time_1(value) {
				 this.contract_time = value;
				 console.log(this.contract_time)
			},
			server_begin_time_1(value) {
				 this.server_begin_time = value;
				 this.to_minSelect = value;
				 console.log(this.server_begin_time)
			},
			 server_end_time_1(value) {
			 	 this.server_end_time = value;
				 this.from_maxSelect = value;
			 	 console.log(this.server_end_time)
			 },
			 
			 
			 formqianyue(){
				var _this = this;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;;
				var secret = globalData.secret;;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id'); 
				var contract_time = this.contract_time;
				var money = this.money;
				var server_begin_time = this.server_begin_time;
				var server_end_time = this.server_end_time;
				var client_id =  this.kid; 
				var is_installment =  this.is_installment; 
				 console.log(is_installment)
				uni.request({
					url: web_site + '/api/clientlog/save_client_contract_info',
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
						contract_time: contract_time,
						money: money,
						server_begin_time: server_begin_time,
						server_end_time: server_end_time,
						client_id: client_id, 
						is_installment: is_installment, 	
					},
					success: res => {
						var result = res.data;
						var data = result.data;  
						if (result.code == '0') {
							uni.showToast({
								title: '提交成功',
								icon: 'none'
							})
						 } else {
							uni.showToast({
								title: result.msg,
								icon: 'none'
							});
						}
					}
				}); 
				 
			 },
			 
			// fenqiChange(e) {
			// 	 this.is_installment = parseInt(e.detail.value);
			// 	 if(e.detail.value == 1){
			// 		 var _this = this;
			// 		 _this.get_client_fee()
			// 	 }
		 //    },
			
			// //获取分期列表
			// get_client_fee(){
			// 	var _this = this;
			// 	var globalData = getApp().globalData;
			// 	var web_site = globalData.web_site;
			// 	var key = globalData.key;
			// 	var secret = globalData.secret;
			// 	var time = base.get_time();
			// 	var rand_num = base.get_rand_num(8);
			// 	var sign = base.get_app_key(secret, key, rand_num, time);
			// 	var uid = uni.getStorageSync('member_id');
			//     var client_id = this.kid;
			// 	uni.request({
			// 		url: web_site + '/api/clientlog/get_client_fee',
			// 		method: 'POST',
			// 		header: {
			// 			'content-type': 'application/x-www-form-urlencoded'
			// 		},
			// 		data: {
			// 			rand_num: rand_num,
			// 			time: time,
			// 			sign: sign,
			// 			key: key,
			// 			secret: secret,
			// 			uid: uid,
			// 			client_id:client_id
			// 		},
			// 		success: res => {
			// 			var result = res.data;
			// 			var data = result.data;
			// 		    console.log(result)
			// 		  if (result.code == '0') {
			// 		   	    _this.fenqilist = data;
			// 			  } else if (result.code == '201') {
			// 				uni.showToast({
			// 					title: '用户不存在',
			// 					icon: 'none'
			// 				});
			// 			} else if (result.code == '101') {
			// 				uni.showToast({
			// 					title: '参数错误',
			// 					icon: 'none'
			// 				});
			// 			}
			// 		}
			// 	})
			// },
			
			// received_time_1(value){
			// 	this.received_time = value; 
			// 	console.log(this.received_time)
			// },
			// daozhangChange(e){
			// 	 this.is_received = parseInt(e.detail.value);
			// 	 console.log( this.is_received)
			// },
			
			// //添加分期
			//  formSubmit_fenqi(){
			// 	var _this = this;
			// 	var globalData = getApp().globalData;
			// 	var web_site = globalData.web_site;
			// 	var key = globalData.key;;
			// 	var secret = globalData.secret;;
			// 	var time = base.get_time();
			// 	var rand_num = base.get_rand_num(8);
			// 	var sign = base.get_app_key(secret, key, rand_num, time);
			// 	var uid = uni.getStorageSync('member_id'); 
			// 	var fee = _this.fee;
			// 	var remark = _this.remark;
			// 	var is_received = _this.is_received;
			// 	var received_time = _this.received_time;
			// 	var client_id =  this.kid; 
				
			// 	uni.request({
			// 		url: web_site + '/api/clientlog/add_client_fee',
			// 		method: 'POST',
			// 		header: {
			// 			'content-type': 'application/x-www-form-urlencoded'
			// 		},
			// 		data: {
			// 			rand_num: rand_num,
			// 			time: time,
			// 			sign: sign,
			// 			key: key,
			// 			secret: secret,
			// 			uid: uid,
			// 			client_id: client_id, 
			// 			fee: fee,
			// 			remark: remark,
			// 			is_received: is_received,
			// 			received_time: received_time,
						  	
			// 		},
			// 		success: res => {
			// 			var result = res.data;
			// 			var data = result.data;  
			// 		   if (result.code == '0') {
			// 				uni.showToast({
			// 					title: '提交成功',
			// 					icon: 'none'
			// 				})
			// 			  _this.fenqi_tanchuang = false;
			// 		 	  _this.get_client_fee()
			// 			 } else {
			// 				uni.showToast({
			// 					title: result.msg,
			// 					icon: 'none'
			// 				});
			// 			}
			// 		}
			// 	}); 
			//   },
			 
			//  // 更新分期弹窗
			//  gengxin(item){
				 
			// 	 var fee_id = item.id
			// 	 var _this = this;
			// 	 var globalData = getApp().globalData;
			// 	 var web_site = globalData.web_site;
			// 	 var key = globalData.key;;
			// 	 var secret = globalData.secret;;
			// 	 var time = base.get_time();
			// 	 var rand_num = base.get_rand_num(8);
			// 	 var sign = base.get_app_key(secret, key, rand_num, time);
			// 	 var uid = uni.getStorageSync('member_id'); 
				
			// 	 uni.request({
			// 	 	url: web_site + '/api/clientlog/get_client_fee_info',
			// 	 	method: 'POST',
			// 	 	header: {
			// 	 		'content-type': 'application/x-www-form-urlencoded'
			// 	 	},
			// 	 	data: {
			// 	 		rand_num: rand_num,
			// 	 		time: time,
			// 	 		sign: sign,
			// 	 		key: key,
			// 	 		secret: secret,
			// 	 		uid: uid,
			// 	 		fee_id: fee_id,
			// 	  	},
			// 	 	success: res => {
			// 	 		var result = res.data;
			// 	 	 	var data = result.data;
			// 	 	    console.log(result)
			// 	 		if (result.code == '0') {
			// 	 			  _this.fee = data.fee;
			// 				  _this.remark = data.remark;
			// 				  _this.is_received = data.is_received;
			// 				  _this.fid = data.id;
			// 				  _this.receivedTime = data.receivedTime;
			// 	 		} else {
			// 	 			uni.showToast({
			// 	 				title: result.msg,
			// 	 				icon: 'none'
			// 	 			});
			// 	 		}
			// 	 	}
			// 	 });
			//   },
			 
			//  tianjiafenqi(){
			//  	var _this = this;
			//  	_this.fenqi_tanchuang = true;
			//  	_this.fee = ""; 
			//  	_this.remark = ""; 
			//  	_this.received_time = ""; 
			//  	_this.is_received = ""; 
			//  },
			 
			//    //提交分期更新
		 //       formSubmit_fenqi_gengxin(fid){
			//  				var _this = this;
			//  				var globalData = getApp().globalData;
			//  				var web_site = globalData.web_site;
			//  				var key = globalData.key;;
			//  				var secret = globalData.secret;;
			//  				var time = base.get_time();
			//  				var rand_num = base.get_rand_num(8);
			//  				var sign = base.get_app_key(secret, key, rand_num, time);
			//  				var uid = uni.getStorageSync('member_id'); 
			//  				var fee = _this.fee;
			//  				var remark = _this.remark;
			//  				var is_received = _this.is_received;
			//  				var received_time = _this.received_time;
			//  				var client_id =  this.kid; 
			// 				var fee_id = fid;
						
			//  				uni.request({
			//  					url: web_site + '/api/clientlog/update_client_fee',
			//  					method: 'POST',
			//  					header: {
			//  						'content-type': 'application/x-www-form-urlencoded'
			//  					},
			//  					data: {
			//  						rand_num: rand_num,
			//  						time: time,
			//  						sign: sign,
			//  						key: key,
			//  						secret: secret,
			//  						uid: uid,
			//  						client_id: client_id, 
			//  						fee: fee,
			//  						remark: remark,
			// 						fee_id: fee_id,
			//  						is_received: is_received,
			//  						received_time: received_time,
			 						  	
			//  					},
			//  					success: res => {
			//  						var result = res.data;
			//  						var data = result.data; 
			// 					    this.get_client_fee();
			// 					   _this.fenqi_tanchuang_dantiao = false
								   
			//  					 if (result.code == '0') {
			//  							uni.showToast({
			//  								title: '提交成功',
			//  								icon: 'none'
			//  						 }) 
			// 					 } else {
			//  							uni.showToast({
			//  								title: result.msg,
			//  								icon: 'none'
			//  							});
			//  						}
			//  					}
			//           	 }); 
			//  	 	 },
			  radio_zhuangtai(e){
				 this.status = parseInt(e.detail.value);
				 console.log( this.status)
			},
			radio_genjiin(e){
				 this.success_status = parseInt(e.detail.value);
				 console.log( this.success_status)
			},
			radio_shibai(e){
				 this.fail_status = parseInt(e.detail.value);
				 console.log( this.fail_status)
			},
			radio_group(e){
				 this.group = parseInt(e.detail.value);
				 console.log( this.group)
			},
			
			get_client_status_info(){
				uni.showLoading({
				   title: '加载中',
				 });
				var _this = this;
				var id = this.kid;
				var globalData = getApp().globalData;
				var web_site = globalData.web_site;
				var key = globalData.key;
				var secret = globalData.secret;
				var time = base.get_time();
				var rand_num = base.get_rand_num(8);
				var sign = base.get_app_key(secret, key, rand_num, time);
				var uid = uni.getStorageSync('member_id');
				 
				uni.request({
					url: web_site + '/api/client/get_client_status_info',
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
						 
					   	  _this.status = data.status;
						  _this.group = data.group;
						  _this.tag = data.tag;
						  _this.show = data.show;
						  _this.success_status = data.success_status;
						  _this.fail_status = data.fail_status;
						  _this.team_list = data.team_list;
						  
						  if(_this.status == 2){
							  _this.disabled1 = true;
							  _this.disabled3 = true;
						  }
						  if(_this.status == 3){
						  	 _this.disabled1 = true;
						  	 _this.disabled2 = true;
						  }
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
			
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.tid = this.team_list[e.detail.value].id
			},
			
			form_zhuangtai(){
			 				var _this = this;
			 				var globalData = getApp().globalData;
			 				var web_site = globalData.web_site;
			 				var key = globalData.key;;
			 				var secret = globalData.secret;;
			 				var time = base.get_time();
			 				var rand_num = base.get_rand_num(8);
			 				var sign = base.get_app_key(secret, key, rand_num, time);
			 				var uid = uni.getStorageSync('member_id'); 
			 			    var id =  this.kid; 
						    var status =  this.status; 
							var group =  this.group; 
							var tag =  this.tag; 
							var success_status =  this.success_status; 
							var fail_status =  this.fail_status; 
			 			    var tid =  this.tid; 
			 				uni.request({
			 					url: web_site + '/api/client/change_client_status',
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
			 						status: status,
			 						group: group,
									tag: tag,
			 						success_status: success_status,
			 						fail_status: fail_status,
									tid:tid
			 						  	
			 					},
			 					success: res => {
			 						var result = res.data;
			 						var data = result.data;  
									console.log(result)
			 					 if (result.code == '0') {
			 							uni.showToast({
			 								title: '提交成功',
			 								icon: 'none'
			 							})
									 var status = result.data.status;
									 console.log(status)
			 					     if(status == 2){
										 _this.disabled1 = true;
										 _this.disabled3 = true;
									  }
									 if(status == 3){
									   _this.disabled1 = true;
									  _this.disabled2 = true;
									  }
									  this.get_client_status_info()
								   } else {
			 							uni.showToast({
			 								title: result.msg,
			 								icon: 'none'
			 							});
			 						}
			 					}
			          	 }); 
			 				 
			           },
			        }
	          }
</script>


<style lang="scss">
	@import url("../../css/icon.css");
	.kehuxiangqing{
		padding-top:30px;
	}
	.content {
		width: 100%;
		padding-bottom: 50px;

        .zhuangtai{
			width: 90%;
			margin: 0 auto;
			margin-bottom: 20px;
			.zhuangtai_list{
				line-height: 40px;
				height: 40px;
				border-bottom: 1px solid #e8e8e8;
				display: flex;
				font-size: 14px;
				color: #8c8c8c;
				.zhuangtai_t{
					  text-align-last:justify;
				}
				 
				 
				input{
					height: 40px;
					line-height: 40px;
					flex:3;
				}
				radio-group{
					flex:3;
					
					radio{
						font-size: 16px;
						transform:scale(0.8);
						
						float: left;
					}
				}
				
			}
		}
         
        .qianyue_box{
			width: 90%;
			margin: 0 auto;
			.qianyue_box_1{
				margin-bottom: 20px;
			}
			.qianyue_list{
				line-height: 40px;
				height: 40px;
				border-bottom: 1px solid #e8e8e8;
				display: flex;
				font-size: 14px;
				color: #8c8c8c;
				.text{
					width: 100px;
					text-align: justify;
					    text-align-last: justify;
						justify-content: space-between;
					  margin-right: 15px;
				}
				 
				 .text::after{
				   width: 100%;
				   display: inline-block;
				   content: '';  //这三个都不可以少
				 }
				input{
					height: 40px;
					line-height: 40px;
					flex:1;
				}
				radio-group{
					flex:1;
					radio{
						font-size: 18px;
						transform:scale(0.7),
					}
				}
				
			}
			.fenqi_box {
				margin-bottom: 15px;
				position: relative;
			}
			
			.fenqi_box::after {
				content: "";
				width: 1px;
				height: 105%;
				background: #e3e3e3;
				position: absolute;
				left: 4px;
				top: 35px;
			}
			
			.kehugenjin_1 {
				width: 100%;
				height: 40px;
				line-height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 10px;
			
				.time {
					height: 30px;
					line-height: 30px;
					color: #fff;
					font-size: 14px;
					background: url(/static/genjin_t_bg.jpg) no-repeat left center #3c5dd6;
					background-size: auto 100%;
					border-radius: 2px;
					padding: 0 10px;
					padding-left: 28px;
				}
			
				.del {
					flex: 2;
					text-align: right;
					font-size: 14px;
					color: #9a9a9a;
				}
			}
			
			.kehugenjin_2 {
				padding-left:20px;
				box-sizing: border-box;
			
				.kehugenjin_2_t {
					display: flex;
			        border-bottom: 1px solid #e8e8e8; 
					height: 40px;
					line-height: 40px;
			
			
					text {
						font-size: 14px;
						color: #8c8c8c;
						width: 100px;
						text-align-last: justify;
					}
			
					.view {
						flex: 4;
						font-size: 14px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
			
					.kehugenjin_fankui {
						flex: 4;
						font-size: 14px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
			
					.kehugenjin_zliao {
						color: #ff5a00;
					}
				}
			}
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

		.kehuguanli_box {
			margin-top: 15px;

			.tab_top {
				width: 100%;
				padding: 0 5%;
				box-sizing: border-box;
				margin: 0 auto;
				border-bottom: 1px solid #e8e8e8;
				margin-bottom: 15px;
				height: 36px;
				background: #fff;
				-webkit-transition: all .3s ease-in-out 0s;
				transition: all .3s ease-in-out 0s;
			}

		}

.wuneirong{
	text-align: center;
	padding-top: 15px;
	padding-bottom: 15px;
	font-size: 15px;
	
}



		.is-fixed {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 999;
		}

		.kehugenjin {
			width: 90%;
			margin: 0 auto;
			overflow-y: hidden;

			.kehugenjin_box {
				margin-bottom: 15px;
				position: relative;
			}

			.kehugenjin_box::after {
				content: "";
				width: 1px;
				height: 105%;
				background: #e3e3e3;
				position: absolute;
				left: 4px;
				top: 35px;
			}

			.kehugenjin_1 {
				width: 100%;
				height: 40px;
				line-height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 10px;

				.time {
					height: 30px;
					line-height: 30px;
					color: #fff;
					font-size: 14px;
					background: url(../../static/genjin_t_bg.jpg) no-repeat left center #3c5dd6;
					background-size: auto 100%;
					border-radius: 2px;
					padding: 0 10px;
					padding-left: 28px;
				}

				.del {
					flex: 2;
					text-align: right;
					font-size: 14px;
					color: #9a9a9a;
				}
			}

			.kehugenjin_2 {
				padding-left: 10px;
				box-sizing: border-box;

				.kehugenjin_2_t {
					display: flex;

					padding: 5px 0;


					text {
						font-size: 14px;
						color: #8c8c8c;
						flex: 1;
					}

					.view {
						flex: 4;
						font-size: 14px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}

					.kehugenjin_fankui {
						flex: 4;
						font-size: 14px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.kehugenjin_zliao {
						color: #ff5a00;
					}
				}
			}

		}
      .genjin_gengxin{
		 padding: 0 5%;
		 box-sizing: border-box;
		  margin: 0 auto;
		  border-top: 15px solid #f4f4f4;
		  padding-top: 15px;
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
		  .gengxin_list{
			  
			  line-height: 40px;
			  display: flex;
			  border-bottom: 1px solid #e8e8e8;
			  font-size: 14px;
			  color: #8c8c8c;
			 
			   .gt{
				   width: 70px;
				   margin-right: 10px;
			   }
			  input{
				  flex: 2;
				  height: 40px;
				  line-height: 40px;
			  }
			  textarea{
				  min-height: 100px;
				  flex:2;
				  line-height: 28px;
				  padding-top: 6px;
			  }
			  
		  }
		  .gengxin_list_child{
		  	 border-bottom: none;
			 margin-top: 15px;
			 margin-bottom: 20px;
		  }
	  }
     button {
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-size: 14px;
					border-radius: 25px;
					background-image: linear-gradient(to right, #2091f1, #3c5dd6);
					color: #fff;
				}
				
				.date_item {
					flex: 1;
					overflow: hidden; 
					text-align: left; 
					height: 40px;
					line-height: 40px;
				
					// font-size: 28rpx;
					&:last-child {
						// float: right;
					}
				
					input {
						height: 40px;
				
						.uni-input-placeholder {
							color: #b5b8c2;
						}
					}
				}
				.filter_inputline {
					float: left;
					margin: 0 4rpx;
					line-height: 40px;
				
					&:after {
						content: '—';
						font-size: 28rpx;
						color: #e8e8e8;
					}
				}
				
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
	         dy-Date{
				 font-size: 14px;
				 height: 100upx;
				 color:#666
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
			height:100upx;
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
	
	.fenqi_tanchuang_zhezhao{
		position: fixed;
		width: 100%;
		height: 100%;
		background:rgba($color: #000000, $alpha: 0.5);
		left: 0;
		top: 0;
		z-index: 99999;
		.fenqi_tanchuang_zhezhao_box{
			   width: 90%;
			    position: absolute;
			    left: 0;
			    right: 0;
			    top: 0;
			    bottom: 0;
			    margin: auto;
			    height: 420px;
				.genjin_gengxin{
					  background: #fff;
					    border: none;
						border-radius: 5px;
						  height: 360px;
				 }
				 .icon-guanbi{
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
	
	.genjincailiao{
		display: flex;
		flex-wrap: wrap;
		flex: 4;
		.genjin_noimg{
			width: 50px;
			height: 50px; 
			 flex: 0 0 25%;
			image {
				width: 50px;
				height: 50px;  
			 }
		}
		.genjin_img{
			margin-right: 10px;
			margin-bottom: 10px;
		     border: 1px solid #eee;
			.images_box{
				width: 50px;
				height: 50px;
				position: relative;
			
				 image{
					width: 100%;
					height: 100%;
				}
				.del {
					width: 15px;
					height: 15px;
					border-radius: 50%;
					position: absolute;
					right: -5px;
					top: -5px;
					background: red;
					display: flex;
					align-items: center;
					justify-content: center;
				
					.iconfont {
						color: #fff;
						font-size: 5px;
				
					}
				}
			}
		}
		
	}
	
	
</style>
