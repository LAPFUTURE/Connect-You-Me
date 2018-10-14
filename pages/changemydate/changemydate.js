const app = getApp();
Page({
    data:{
        dateId:'',
        title:'',
        date:'',
        onlyme:false,
    },
    onLoad:function(options){
        let dateId = options.dateId;
        this.setData({
            dateId:dateId
        });
        let dates = wx.getStorageSync("myDate");
      
        for(let i = 0,length = dates.length; i < length; i++){
            if(dateId == dates[i].dateId){
                this.setData({
                    title:dates[i].title,
                    date:dates[i].date
                });
                break;
            }
        }
    },

    bindtitle:function(e){
        this.setData({
            title:e.detail.value
        });
    },

    bindcontent:function(e){
        this.setData({
            date:e.detail.value
        });
    },
    
    onlyme:function(e){
        this.setData({
            onlyme:e.detail.value
        })
    },
    
    submit:function(){
        wx.showLoading();
        wx.request({
            url:app.globalData.url + "changeDate",
            method:'post',
            header:{'content-type':'application/x-www-form-urlencoded'},
            data:{
                dateId:this.data.dateId,
                title:this.data.title,
                date:this.data.date,
                onlyme:this.data.onlyme
            },
            success:function(res){
                if(res.data.status == 1){
                    console.log(res.data);
                    wx.hideLoading();
                    wx.showToast({
                        title:'修改成功'
                    })
                }
            }
        })
    }
})