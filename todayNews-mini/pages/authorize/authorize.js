const app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var _this = this;
      wx.getUserInfo({
        success:function(res){
          console.log(res)
          var pages = getCurrentPages();//pages[0]上一个页面
          pages[0].setData({ userInfo: res.userInfo})
        }
      });
      //插入登录的用户的相关信息到数据库
      // wx.request({
      //   url: app.globalData.urlPath + 'user/add',
      //   data: {
      //     openid: getApp().globalData.openid,
      //     nickName: e.detail.userInfo.nickName,
      //     avatarUrl: e.detail.userInfo.avatarUrl,
      //     province: e.detail.userInfo.province,
      //     city: e.detail.userInfo.city
      //   },
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   success: function (res) {
      //     //从数据库获取用户信息
      //     that.queryUsreInfo();
      //     console.log("插入小程序登录用户信息成功！");
      //   }
      // });
      wx.navigateBack()
    }
  },
})
