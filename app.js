//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          let url = this.globalData.url;
          wx.request({
            url:url+"openid",
            data:{
              code:res.code
            },
            header:{
              'Conttype-Type':'application/json'
            },
            success:(res)=>{
                let data =  res.data;
                data = JSON.parse(data);
                let openId = data.openid;
              wx.setStorage({
                key:"openid",
                data:data.openid
              });
              this.globalData.openId = openId;
              console.log("openId:",openId);
            }
          });
          
        }else{
          console.log("获取用户openId失败!");
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log("res:",res);
              // 可以将 res 发送给后台解码出 unionId
              // console.log(res);
              this.globalData.userInfo = res.userInfo;
              this.globalData.hasUserInfo = true;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    // url:"http://106.14.199.207/index.php/admin/Wxback/",//线上
    // url:"http://connectyoume.top/index.php/admin/Wxback/",//线上域名
    url:"http://127.0.0.1/ConnectYouMe_back/public/index.php/admin/Wxback/",//本地
    userInfo: null,
    hasUserInfo:false,
    openId:'',
    quote:{},
    dates:[]
    // unionId:''
  }
})