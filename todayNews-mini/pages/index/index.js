//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flag: 0,
    userInfo: {}
  },
  onLoad: function () {
    
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
  seeDetail:function(){
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
})
