//login.js
var bsurl = require('../../../utils/bsurl.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone:'',
      password:'',
      linktype:1,
      url:''
  },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        //登录成功后跳转类型(1,2,3) navgitorback , redirect ,switchTab
        this.setData({
            linktype: options.t || 3,
            url: options.url || '../home/index'
        })

    },
    //bindinput 键盘输入时触发
    inputValue: function (event) {
        let type = event.currentTarget.dataset.type;
        if (type == 1) {
            this.setData({
                phone:event.detail.value
            })
        }else{
            this.setData({
                password:event.detail.value
            })
        }
    },
    //提交登录表单
    login:function(){
        var that = this;
        let phoneNum = that.data.phone
        let url = 'login/cellphone'
        if (!(/^1[3456789]\d{9}$/.test(phoneNum))){//正则验证手机号
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            })
        }else{
            wx.showToast({
                title: '登录中...',
                icon: 'loading'
            })
            wx.request({
                url: bsurl + url,
                data:{
                    phone: that.data.phone,
                    password: that.data.password
                },
                success: function(res) {
                    wx.hideToast();
                    console.log(res)
                    if(res.data.code !== 200){
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none'
                        })                       
                    }else{
                        app.globalData.hasLogin = true;
                        app.globalData.userInfo = res.data;
                        app.globalData.userId = res.data.profile.userId;
                        if (that.data.linktype == 1) {
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                        else if (that.data.linktype == 2) {
                            wx.redirectTo({
                                url: that.data.url
                            })
                        } else {
                            wx.switchTab({
                                url: '../home/index'
                            });
                        }
                    }
                }
            })
        }
        console.log(app.globalData)
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },


})