const app = getApp();

Page({
  data: {
    openId:'',
    url:app.globalData.url,
    userInfo: app.globalData.userInfo,
    hasUserInfo: app.globalData.hasUserInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow:function(){
    this.setData({
       userInfo : app.globalData.userInfo,
       hasUserInfo : app.globalData.hasUserInfo,
       openId:app.globalData.openId
    });
  },
  getUserInfo: (e)=>{
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  mydate:function(){
    wx.showLoading({
      title:"加载中"
    });
    wx.request({
      url:this.data.url+"mydate",
      method:"post",
      header: {'content-type': 'application/x-www-form-urlencoded'},
      data:{
        openId:this.data.openId,
        datePage:1
      },
      success:function(res){
        wx.setStorageSync("myDate",res.data.dates);
        wx.hideLoading();
        wx.navigateTo({
          url:"/pages/mydate/mydate",
        });
      }
    });
  },
  mycollection:function(){
    wx.showLoading({
      title:"加载中"
    });
    wx.request({
      url:this.data.url + "mycollection",
      method:"post",
      header:{'content-type':'application/x-www-form-urlencoded'},
      data:{
        openId:this.data.openId,
        dataPage:1
      },
      success:function(res){
        console.log(res.data.dates);
        wx.setStorageSync("myCollection",res.data.dates);
        wx.hideLoading();
        wx.navigateTo({
          url:"/pages/mycollection/mycollection",
        });
      }
    });
 
  }
})
