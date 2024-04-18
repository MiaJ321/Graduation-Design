var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
//引入获得地址的js文件
var qqmapsdk;
const app=getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",  // 上传的图片
    title:"",  
    zhizuo:"",  // 菜品制作
    yuanliao:"",  // 菜品原料
    radio:"",  // 类型
    money:"",  // 金额
    buzhou:"",  // 步骤
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

  },

  //获取标题
  getTitle(e){
    console.log(e.detail.value)
    this.setData({
      title:e.detail.value
    });
  },

   // 原料
   getYuanliao(e){
    console.log(e.detail.value)
    this.setData({
      yuanliao:e.detail.value
    });
  },

    // 制作
    getZzhizuo(e){
      console.log(e.detail.value)
      this.setData({
        zhizuo:e.detail.value
      });
    },

      // 制作
      getBuzhou(e){
        console.log(e.detail.value)
        this.setData({
          buzhou:e.detail.value
        });
      },

  // 选着服务类型
  onChangeRadio(event) {
    console.log(event.detail)
    this.setData({
      radio: event.detail,
    });
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


// 点击上传图片
changeBigImg() {
  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    success :res=>{
      console.log(res)
      console.log(res.tempFiles[0].path)
      wx.uploadFile({
        url: "http://127.0.0.1:5000/upload",  //node服务端口
        filePath:res.tempFiles[0].path,//这里接受上传文件的path
        name:"file",
        header: {
          "content-type": "multipart/form-data"//注意
        },
        success :res=> {
          console.log(JSON.parse(res.data).imgUrl)   // 上传图片后 返回的图片链接地址
          this.setData({
            img:JSON.parse(res.data).imgUrl
          })
        },
        fail:function(err){
          console.log(err);
        }
      })
    }
  });
 },


 // 提交
 addBtn(){
  if(!this.data.img){
    wx.showModal({
      title: '提示',
      content:"请上传美食封面",
      showCancel:false,
      success:()=>{
        return
      }
    })
  }else if(!this.data.title){
    wx.showModal({
      title: '提示',
      content:"请输入美食标题！",
      showCancel:false,
      success:()=>{
        return
      }
    })
  }else if(!this.data.zhizuo){
    wx.showModal({
      title: '提示',
      content:"请输入美食制作方式！",
      showCancel:false,
      success:()=>{
        return
      }
    })
  }else if(!this.data.buzhou){
    wx.showModal({
      title: '提示',
      content:"请输入步骤！",
      showCancel:false,
      success:()=>{
        return
      }
    })
  }else if(!this.data.yuanliao){
    wx.showModal({
      title: '提示',
      content:"请输入美食原料！",
      showCancel:false,
      success:()=>{
        return
      }
    })
  }else if(!this.data.radio){
    wx.showModal({
      title: '提示',
      content:"请选美食类型！",
      showCancel:false,
      success:()=>{
        return
      }
    })
  }else{
    wx.showLoading({
      title: '请稍后...',
    })
    wx.request({ 
      url: 'http://127.0.0.1:5000/addCaipin', 
      data: {
        img:this.data.img,
        title:this.data.title,
        yuanliao:this.data.yuanliao,
        zhizuo:this.data.zhizuo,
        num:this.data.radio,
        money:this.data.money,
        shijian:this.getTime(),
        buzhou:this.data.buzhou,
        tel:wx.getStorageSync('tel')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        console.log(res.data)
        wx.hideLoading()
        if(res.data.code==200){
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: "发布成功！",
            showCancel:false,
            success:()=> {
              // wx.navigateBack({
              //   delta:1
              // })
              this.setData({
                img:"",  // 上传的图片
                title:"",
                zhizuo:"",
                yuanliao:"",
                radio:"",  // 服务类型
                money:"",  // 金额
              });
              wx.switchTab({
                url: '../my/my',
              })
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: "发布失败！",
            showCancel:false,
            success () {
              wx.navigateBack({
                delta:1
              })
            }
          })
        }
      }
    })
  }
 },



})