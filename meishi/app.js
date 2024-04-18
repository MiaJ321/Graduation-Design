// app.js
App({

  // 小程序一启动就会执行
  onLaunch() {
   console.log("小程序启动了");
   
   // 初始化云开发环境
    wx.cloud.init({
      env:"sirfuao-4gczpw45e6c4ae20"
    })
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },

  // 全局变量
  globalData: {
    userInfo: null,
    tabIndex:0   ,
      // 在需要用到的页面调用就可以获取到 getApp().globalData.tabIndex;
  }
})
