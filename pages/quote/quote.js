//logs.js
const app = getApp();

Page({
  data: {
    quote:{},
    num:1
  },
  onLoad: function () {
    console.log(app.globalData.quote);
    this.setData({
        quote:app.globalData.quote
    });
    console.log(this.data.quote.origin_img_urls[0]);
    wx.getImageInfo({
       src:this.data.quote.origin_img_urls[0],
       success:function(res){
          console.log("图片信息:",res);
       },
       fail:function(){
          console.log('调用失败');
       }
    });
  },
  
})
