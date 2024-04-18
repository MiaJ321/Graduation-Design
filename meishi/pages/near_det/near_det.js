// pages/comment/comment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      obj:[],
      dataList:[],  // 评论数组
      start:0,
      pageSize:10,
      
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(JSON.parse(options.obj))
        this.setData({
          obj:JSON.parse(options.obj),
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
        url: 'http://127.0.0.1:5000/getNearping',
        data:{
            start:this.data.start,
            num:this.data.pageSize
        },
        
        header: {
          'content-type': 'application/json' 
        },
        success:res=> {
          console.log(res.data.list);
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
        this.getPinglun()
    })
},
  
      // 获取发表评论
      getInput(e){
        console.log(e.detail.value);
        this.setData({
          msg:e.detail.value
        });
      },
      
     

    


    
    
     
  
  })