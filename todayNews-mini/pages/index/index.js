//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flag: 0,
    userInfo: {},
    list:[]
  },

  onLoad: function (options) {
    this.getNewsList()
  },

  getNewsList: function () {
    let that = this
    wx.request({
      url: 'https://zrf.leop.pro/api/news/list?length=15',
      method: 'GET',
      success(res) {
        let list = res.data.data.list
        that.setData({
          list: list
        })
      }
    })
  },

  switchNav:function(e){
    var id = e.target.id;
    var page = this;
    if (this.data.flag==id){
       return false;
    }else{
      page.setData({ flag:id});
    }
  },
  seeDetail:function(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
       url: "/pages/detail/detail?id=" + id
    })
  }
})
