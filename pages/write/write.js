const app = getApp();
Page({
    data:{
        title:'',
        content:''
    },
    bindtitle:function(e){
        this.setData({
            title:e.detail.value
        });
      
    },
    bindcontent:function(e){
        this.setData({
            content:e.detail.value
        })
    },
    submit:function(){
        if(this.data.title && this.data.content){
            wx.request({
            url:app.globalData.url + "adddate",
            method:"post",
            header: {'content-type': 'application/x-www-form-urlencoded'},
            data:{
                openId:app.globalData.openId,
                title:this.data.title,
                content:this.data.content
            },
            success:function(res){
               console.log("res:",res.data.status);
               if(res.data.status == 1){
                wx.showModal({
                    title:"提交成功!"
                })
               }else{
                wx.showModal({
                    title:"服务器繁忙，请稍后再试!"
                })   
               }
            }
        })
        }else{
            wx.showModal({
                title:"Title或Content不能为空!"
            })
        }
        
    }
    
    
})