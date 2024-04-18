// pages/category/category.js
Page({

  /**
   
   */
  data: {
    rightConentList:[],
    leftMenuList:["早餐","素食","荤菜","汤品","烘焙","其他"],
    //默认选中第一个
    currentIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(){
      //获取全局变量
    var tabIndex = getApp().globalData.tabIndex;
    console.log(tabIndex)
    this.setData({
      currentIndex:tabIndex
    });
    this.getShopData(this.data.currentIndex);
    console.log(this.data.currentIndex);
  },

  //获取商品
  getShopData(num){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/getFenlei',
      data: {
        num
      },
      header: {
        'content-type': 'application/json' 
      },
      success:res=> {
        console.log(res.data)
        this.setData({
          rightConentList:res.data.list
        });
        wx.hideLoading()
      }
    })
  },
  
  // 切换
  handleItemTap(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      currentIndex:e.currentTarget.dataset.index
    });
    this.getShopData(this.data.currentIndex);
  },

  // 跳转详情页
  goDetail(e){
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../detail/detail?data='+JSON.stringify(e.currentTarget.dataset.item),
    })
  },

    // 跳转到搜索
    goSearch(){
     wx.navigateTo({
       url: '../search/search',
     })
    },

})