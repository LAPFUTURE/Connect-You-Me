//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    quote:'',
    dates:[],
    page:1,
    star:'',
    dateOrTitle:'',
  },
  //事件处理函数
  onLoad: function () {
    let that = this;
    wx.request({
      url:"https://rest.shanbay.com/api/v2/quote/quotes/today/",
      success:(res)=>{
        this.setData({
          quote:res.data.data
        });
        app.globalData.quote = res.data.data;
      }
    });
    wx.request({
      url:app.globalData.url + "askquote",
    });
    wx.request({
      url:app.globalData.url+"page?page="+this.data.page,
      success:function(res){
        that.setData({
          dates:res.data,
          page:that.data.page+1
        });
        app.globalData.dates = res.data;
      },
    });
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
      
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      })
    }
    let timer = setInterval(function(){
        if(that.data.userInfo && app.globalData.openId){
          clearInterval(timer);
          let userInfo = that.data.userInfo;
          let openId = app.globalData.openId;
          wx.request({
            url:app.globalData.url+"adduser",
            method:"post",
            header: {'content-type': 'application/x-www-form-urlencoded'},
            data:{
              openId:openId,
              nickName:userInfo.nickName,
              gender:userInfo.gender,
              city:userInfo.city,
              province:userInfo.province,
              avatarUrl:userInfo.avatarUrl,
              country:userInfo.country
            },
            success:function(res){ 
              // if(res.data.status != 1){
              //     wx.showModal({
              //       title:"用户入库失败"
              //     })
              // }
            }
          })
        }
    },50);
    // timer;

  },
  getUserInfo: (e)=>{
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  onReachBottom:function(){//距离底部刷新
    let that = this;
    wx.showLoading({
      title:"加载中!"
    });
    wx.request({
      url:app.globalData.url+"page?page="+this.data.page,
      success:function(res){
        if(!res.data.msg){
        that.setData({
          dates:that.data.dates.concat(res.data),
          page:that.data.page+1
        });
        app.globalData.dates = that.data.dates;
        wx.hideLoading();
       }else{
        wx.hideLoading();
         wx.showModal({
           title:"我也是有底线的",
           success:function(res){
             if(res.confirm){
              
             }else{
              
             }
           }
         })
       }
        
      },
    });
  },
  dateortitle:function(e){
    this.setData({
      dateOrTitle:e.detail.value
    });
  },
  search:function(){
    if(this.data.dateOrTitle){
      wx.showLoading({
        title:"加载中!"
      });
      wx.request({
        url:app.globalData.url + "search",
        method:"post",
        header:{'content-type':"application/x-www-form-urlencoded"},
        data:{
          dateOrTitle:this.data.dateOrTitle
        },
        success:function(res){
          if(res.data.status == 1){
            console.log(res.data.data);
            wx.setStorageSync("searchResult",res.data.data);
            wx.hideLoading();
            wx.navigateTo({
              "url":'/pages/searchresult/searchresult'
            });
          }else{
            wx.hideLoading();
            wx.showToast({
              title:"暂无资源",
              icon:"none"
            });
          }
        },
        fail:function(){
          wx.hideLoading();
          wx.showToast({
            title:"服务器繁忙，请稍后再试",
            icon:"none"
          });
        }
      });
    }else{
      wx.showToast({
        title:"内容不能为空!",
        icon:"none"
      })
    }
    
  },
  getquote:()=>{//点击每日一句
    wx.navigateTo({
      url:"/pages/quote/quote"
    })
  },
  showdate:(e)=>{//点击日记详情
    let dateid  = e.target.dataset.dateid;
    console.log("dataId:",dateid);
    wx.navigateTo({
      url:"/pages/date/date?dateid="+dateid
    })
  },
  add:function(){
    this.setData({
      star:(this.data.star+1)
  });
  }
})
