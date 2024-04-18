// pages/my_add/my_add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      dataList:[],
      start:0,
      pageSize: 10,
      total:0
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
        // 初始化一下
      this.data.dataList=[];
      this.data.start=0;
      this.getData();
    },
   
  
    // 获取发布的美食
    getData(){
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'http://127.0.0.1:5000/getNearby',
        data:{
            start:this.data.start,
            num:this.data.pageSize
        },
        header: {
          'content-type': 'application/json' 
        },
        success:res=> {
          console.log(res.data.list)
          this.setData({
            dataList:[...this.data.dataList,...res.data.list] ,
          });
          wx.hideLoading()
        }
      })
    },

    //下拉加载
    scrolltolower(){
        this.setData({
            start:this.data.start+=10
        },()=>{
            this.getData()
        })
    },
  

    // 跳转到详情页
    goDetail(e){
      console.log(e.currentTarget.dataset.obj);
    //   用于将 JavaScript 值转换为 JSON 字符串（将对象或数组转换为 JSON 字符串）
      wx.navigateTo({
        url: '../near_det/near_det?obj=' + JSON.stringify(e.currentTarget.dataset.obj)
      })
    },
  
  })