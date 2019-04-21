var app = getApp();
Page({
  data: {
    userInfo: {},
    isLogin: false
  },
  onLoad: function() {
    var page = this;
  },
  login: function() {
    var _this = this
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.navigateTo({
            url: '/pages/authorize/authorize',
          })
          _this.setData({
            isLogin: true,
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '登录失败',
        })
      },
    })
  },
  setup: function() {
    wx.navigateTo({
      url: '../setup/setup',
    })
  }

})