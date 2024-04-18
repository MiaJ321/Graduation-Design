// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:'',
    name:"",
    img:"",


   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   

  },

  onShow: function () {
    console.log(wx.getStorageSync('info'));
    this.setData({
      name:wx.getStorageSync('userInfo').nickName||"",
      img:wx.getStorageSync('userInfo').avatarUrl
    });
  },


  // 管理员登录
  goAdmin(){
    wx.navigateTo({
      url: '../add/add',
    })
  },

  // 我的发布
  goMyAdd(){
    wx.navigateTo({
      url: '../my_add/my_add',
    })
  },

  goMycom(){
      wx.navigateTo({
        url: '../my_com/my_com',
      })
  },

  gSet(){
    wx.navigateTo({
      url: '../set/set',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


})