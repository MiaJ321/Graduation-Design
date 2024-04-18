// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 搜索
  changeTitle(e){
    console.log(e.detail)
    wx.showLoading({
      title: '查询中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/search',
      data: {
        title:e.detail
      },
      header: {
        'content-type': 'application/json' 
      },
      success:res=> {
        console.log(res.data.list)
        this.setData({
          dataList:res.data.list
        });
        wx.hideLoading()
      }
    })
    if(e.detail==""){
      this.setData({
        dataList:[]
      });
    }
  },

     
  // 跳转到详情页
  goDetail(e){
    console.log(e.currentTarget.dataset.obj);
    wx.navigateTo({
      url: '../detail/detail?data=' + JSON.stringify(e.currentTarget.dataset.obj)   
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },



 
})