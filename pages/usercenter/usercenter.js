const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: app.globalData.userInfo,
    hasUserInfo: app.globalData.hasUserInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow:function(){
    // wx.showLoading({
    //     title:"加载中"
    // });
    console.log(app.globalData.userInfo);
    this.setData({
       userInfo : app.globalData.userInfo,
       hasUserInfo : app.globalData.hasUserInfo
    });
  } 
})
