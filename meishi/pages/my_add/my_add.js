// pages/my_add/my_add.js
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },

  // 获取发布的美食
  getData(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/getMyCaipin',
      data: {
        tel:wx.getStorageSync("tel")
      },
      header: {
        'content-type': 'application/json' 
      },
      success:res=> {
        console.log(res.data.list)
        this.setData({
          dataList:res.data.list,
        });
        wx.hideLoading()
      }
    })
  },

  // 删除 存在问题，删不掉
  del(e){
    console.log(e.currentTarget.dataset.id);
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？ ',
      success:(res)=>{
        if (res.confirm) {
          wx.showLoading({
            title: '加载中...',
          })
          wx.request({
            url: 'http://127.0.0.1:5000/delCaipin',
            data: {
              goods_id:e.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' 
            },
            success:res=> {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: "删除成功！",
                showCancel:false,
                success:()=>{
                  this.getData();
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 跳转到详情页
  goDetail(e){
    console.log(e.currentTarget.dataset.obj);
    wx.navigateTo({
      url: '../detail/detail?data=' + JSON.stringify(e.currentTarget.dataset.obj)   
    })
  },

})