const app = getApp();
// console.log("这个this就是后面箭头函数绑定的undefined，所以不能直接用箭头函数:",this);
let page = {
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
  getUserInfo: function(e){
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
      console.log(this.data.url);
    wx.request({
      url: this.data.url +"mydate",
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
        if(res.data.status == 1){
          wx.setStorageSync("myCollection",res.data.dates);
          wx.hideLoading();
          wx.navigateTo({
            url:"/pages/mycollection/mycollection",
          });
        }else{//"status==0",表示无收藏
          wx.hideLoading();
          wx.showModal({
            title:"你的收藏空空如也,是否去收藏?",
            icon:"none",
            success:function(res){
              if(res.confirm){
                wx.switchTab({
                  url:"/pages/index/index",
                });
              }
            }
          })
        } 
      }
    });
  },
  mycomment:function(){
    wx.showLoading({
      title:"加载中"
    });
    
  }
};
Page(page);
