Page({
    data:{
       myCollection:''
    },
    onShow:function(){
        this.setData({
           myCollection:wx.getStorageSync("myCollection")
        });
       
    }
})