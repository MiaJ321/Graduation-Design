// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:[],
    dataList:[],  // 评论数组
    img:"",  // 用户头像
    name:""   ,// 用户名
    tel:"" //用户手机号，用于删除
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.obj))
    this.setData({
      obj:JSON.parse(options.obj),
      img:wx.getStorageSync('userInfo').avatarUrl,
      name:wx.getStorageSync('userInfo').nickName,
      tel:wx.getStorageSync("tel") //获取手机号
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPinglun()
  },

   // 获取用户评论
   getPinglun(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/getPinglun',
      data: {
        goods_id:this.data.obj.goods_id
      },
      header: {
        'content-type': 'application/json' 
      },
      success:res=> {
        console.log(res.data.list);
        this.setData({
          dataList:res.data.list
        });
        wx.hideLoading()
      }
    })
  },


    // 获取发表评论
    getInput(e){
      console.log(e.detail.value);
      this.setData({
        msg:e.detail.value
      });
    },
  
  
    // 发表评论
    add(){
      if(!this.data.msg){
        wx.showModal({
          title: '提示',
          content:"请先输入评论！",
          showCancel:false,
          success:()=>{
            return
          }
        })
      }else if(!this.data.img){
        wx.showModal({
          title: '提示',
          content:"请先登录！",
          showCancel:false,
          success:()=>{
            return
          }
        })
      }else{
        wx.showLoading({
          title: '加载中...',
        })
        wx.request({
          url: 'http://127.0.0.1:5000/addPinglun', // 发布评论
          data: {
            goods_id:this.data.obj.goods_id,
            name:this.data.name,
            img:this.data.img,
            title:this.data.msg,
            time:this.getTime(),
            tel:wx.getStorageSync("tel")
          },
          header: {
            'content-type': 'application/json' 
          },
          success:res=> {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content:"发布评论成功！",
              showCancel:false,
              success:()=>{
                this.setData({
                  msg:""
                });
                this.getPinglun();
              }
            })
          }
        })
      }
    },
  
    // 获取当前时间
    //显示日期在页面上  yyy-MM-dd
    getTime(){
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth();//得到月份
      var date = now.getDate();//得到日期
      var day = now.getDay();//得到周几
      var hour = now.getHours();//得到小时
      var minu = now.getMinutes();//得到分钟
      var sec = now.getSeconds();//得到秒
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      var time = "";
      //精确到天
      time = year + "-" + month + "-" + date;
      // return time;
      console.log(time)
      return time
  },

})