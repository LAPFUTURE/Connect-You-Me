const app = getApp();
Page({
    data:{
       myDate:'',
       datePage:2,
       url:app.globalData.url,
       //不在这里使用openId:app.globalData.openId是因为页面初始化时app.globalData.openId可能还没有回来，所以可以将
       //openId:app.globalData.openId在下面的点击触发时再进行赋值，这样不存在异步的问题
    },
    onShow:function(){
        this.setData({
            myDate:wx.getStorageSync("myDate"),
        });
    },
    onReachBottom:function(){
        wx.showLoading({
            title:"加载中"
        });
        let that = this;
        wx.request({
            url:this.data.url + "mydate",
            method:"post",
            header:{"content-type":"application/x-www-form-urlencoded"},
            data:{
              openId:this.data.openId,
              datePage:this.data.datePage
            },
            success:function(res){
                if(res.data.status == 1){
                  that.setData({
                    myDate:that.data.myDate.concat(res.data.dates),
                    datePage:(this.data.datePage + 1)
                  });
                  wx.hideLoading();
                }else{
                  wx.showToast({
                    title:"我也是有底线的!"
                  });
                  wx.hideLoading();
                }
            }
        })
    },  
    
    deleteMyDate:function(e){
        let that = this;
        let dateId = e.currentTarget.dataset.dateid;
        wx.request({
          url: this.data.url + "deleteMyDate",
          method:"post",
          header:{'content-type':'application/x-www-form-urlencoded'},
          data:{
            openId:app.globalData.openId,
            dateId:dateId
          },
          success:function(res){ 
            let status = res.data.status;
            if(status == 1){
              let length = that.data.myDate.length;
              let arr = that.data.myDate;
              for(let i = 0; i < length; i++){
                if(arr[i].dateId == dateId){
                  arr.splice(i,1);
                  that.setData({
                    myDate:that.data.myDate
                  });
                 break;
                }
              }
              wx.showToast({
                title:"删除成功"
              });
            }else if(status == 0 ){
              wx.showToast({
                title:"删除失败"
              });
            }else{
              wx.showToast({
                title:"参数错误"
              });
            }
          },
          fail:function(){
            wx.showToast({
              title:"删除失败,请重试!",
              icon:"none"
            })
          }
        });
    },
    writeMyDate:function(e){
      let dateId = e.currentTarget.dataset.dateid;
      wx.navigateTo({
        url:"/pages/changemydate/changemydate?dateId="+dateId
      })
    }
})