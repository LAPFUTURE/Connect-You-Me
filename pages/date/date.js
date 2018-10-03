const app = getApp();
Page({
    data:{
        dateId:'',
        dates:'',
        date:{}
    },
    onLoad:function(options){
        this.setData({
           dateId:options.dateid,
           dates : app.globalData.dates
        });
        let arr = this.data.dates;
        for(let i = arr.length; i-- ;){
            if(arr[i].dateId == options.dateid){
                this.setData({
                   date:arr[i]
                });
                break;
            }
        }
    }
})