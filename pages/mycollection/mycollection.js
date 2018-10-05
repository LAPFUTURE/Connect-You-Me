Page({
    data:{

    },
    onShow:function(){
        let a = wx.getStorageSync("myCollection");
                // wx.getStorageSync("myDate")
        console.log(a);
    }
})