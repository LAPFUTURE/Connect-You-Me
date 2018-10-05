const app = getApp();
Page({
    data:{
       myDate:'',
       datePage:2
    },
    onShow:function(){
        console.time("b");
        this.setData({
            myDate:wx.getStorageSync("myDate")
        });
    },
    onReachBottom:function(){
        wx.showLoading({
            title:"加载中"
        });
        let that = this;
        wx.request({
            url: app.globalData.url + "userdate",
            method:"post",
            header:{"content-type":"application/x-www-form-urlencoded"},
            data:{
              openId:app.globalData.openId,
              datePage:this.data.datePage
            },
            success:function(res){
                that.setData({
                    myDate:that.data.myDate.concat(res.data.dates)  
                });
                wx.hideLoading();
            }
        })

    }
})