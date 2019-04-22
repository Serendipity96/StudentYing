//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flag: 0,
    list: [],
    topNewsId: -1,
    category:[]
  },

  onLoad: function(options) {
    this.getCategory()
    this.getNewsList()
  },

  getCategory(){
    let that = this
    const url = 'https://zrf.leop.pro/api/category/list'
    wx.request({
      url: url,
      method: 'GET',
      success(res) {
          that.setData({
            category:res.data.data
          })
          console.log(that.data)
      },
      fail(err) {
        console.log(err)
      },
    })
  },

  getNewsList: function() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let topNewsId = this.data.topNewsId
    let url = 'https://zrf.leop.pro/api/news/list?length=5&top_news_id=' + this.data.topNewsId
    wx.request({
      url: url,
      method: 'GET',
      success(res) {
        if (res.data.data.length !== 0) {
          let list = res.data.data.list
          let topNewsId = res.data.data.top_news_id
          that.setData({
            list: that.data.list.concat(list),
            topNewsId: topNewsId
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        } else {
          wx.showToast({
            title: '已经到底啦~',
          })
        }
      },
      fail(err) {
        console.log(err)
      },
    })
  },

  lower(){
    if (!this.loading) {
      this.getNewsList()
    }
  },
  
  upper() {
    if (!this.loading) {
      this.setData({
        topNewsId:-1,
        list:[]
      })
      this.getNewsList()
    }
  },

  switchNav: function(e) {
    var idx = e.target.dataset.idx;
    var page = this;
    if (this.data.flag == idx) {
      return false;
    } else {
      page.setData({
        flag: idx
      });
    }
  },
  seeDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id
    })
  }
})