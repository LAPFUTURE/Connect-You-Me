//logs.js
const app = getApp();

Page({
  data: {
    quote:{},
    num:1
  },
  onLoad: function () {
    this.setData({
        quote:app.globalData.quote
    });
    console.log(this.data.quote.origin_img_urls[1]);
  },
 
})
