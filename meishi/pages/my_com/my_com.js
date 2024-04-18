// pages/my_com/my_com.wxml.js
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
  
    // 获取发布的评论
    getData(){
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'http://127.0.0.1:5000/getMyCom',
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
  
    // 删除 
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
              url: 'http://127.0.0.1:5000/delPinglun',
              data: {
                pinglun_id:e.currentTarget.dataset.id
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
})