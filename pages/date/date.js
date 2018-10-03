const app = getApp();
Page({
    data:{
        dateId:'',
        dates:'',
        date:{},
        star_being:true,
        collect_being:true,
        url:app.globalData.url,
        openId:''
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
        this.setData({
            openId:app.globalData.openId
        });
    },
    click_star:function(){
        if(this.data.openId){
            let that = this;
            if(this.data.star_being){//未star状态
                wx.request({
                    url:that.data.url + "star",
                    method:"post",
                    header: {'content-type': 'application/x-www-form-urlencoded'},
                    data:{
                        openId : that.data.openId,
                        dateId : that.data.dateId,
                        starStatus: this.data.star_being
                    },
                    success:function(res){
                        if(res.data.status == 1){
                            wx.showToast({
                                title:"Star Success!"
                            })
                        }else{
                            wx.showToast({
                                title:"服务器繁忙，请稍后再试!",
                                duration:1000
                            })
                       }
                    }
                })
                this.setData({
                    star_being:!this.data.star_being,
                });

            }else{//star状态，要取消star
                wx.request({
                    url:that.data.url + "star",
                    method:"post",
                    header: {'content-type': 'application/x-www-form-urlencoded'},
                    data:{
                        openId : that.data.openId,
                        dateId : that.data.dateId,
                        starStatus: this.data.star_being
                    },
                    success:function(res){
                        if(res.data.status == 1){
                            wx.showToast({
                                title:"Cancel Success!"
                            })
                        }else{
                            wx.showToast({
                                title:"服务器繁忙，请稍后再试!"
                            })
                       }
                    }
                })
                this.setData({
                    star_being:!this.data.star_being,
                });
            }
        }else{
            wx.showModal({
                title:"您未登录，请登录!",
                success:function(res){
                    if(res.confirm){
                        wx.switchTab({//这里不能使用wx.navigateTo,swithchTab才可以跳到Tab页面
                            url:"/pages/usercenter/usercenter"
                        })
                    }
                }
            })
        }
    },
    click_collect:function(){
        if(this.data.openId){
            let that = this;
            if(this.data.collect_being){//未收藏状态
                wx.request({
                    url:that.data.url + "collect",
                    method:"post",
                    header: {'content-type': 'application/x-www-form-urlencoded'},
                    data:{
                        openId : that.data.openId,
                        dateId : that.data.dateId,
                        collectStatus: this.data.collect_being
                    },
                    success:function(res){
                        if( res.data == 1 ){
                            wx.showToast({
                               title:"Collect Success!"
                            })
                        }else{
                            let status = res.data.status;
                            if(status == -1 ){
                                wx.showToast({
                                    title:"您已经收藏了."
                                })
                            }else{
                                wx.showToast({
                                    title:"服务器繁忙，请稍后再试."
                                })
                            }
                        }
                    }
                });
                 this.setData({
                    collect_being:!this.data.collect_being
                });
            }else{//取消收藏
                wx.request({
                    url:that.data.url + "collect",
                    method:"post",
                    header: {'content-type': 'application/x-www-form-urlencoded'},
                    data:{
                        openId : that.data.openId,
                        dateId : that.data.dateId,
                        collectStatus: this.data.collect_being
                    },
                    success:function(res){
                        if(res.data.status == 1 || res.data.status == 0){
                            wx.showToast({
                                title:"取消收藏成功."
                            })
                        }
                    }
                });
                 this.setData({
                    collect_being:!this.data.collect_being
                });
            }
        }else{
            wx.showModal({
                title:"您未登录，请登录!",
                success:function(res){
                    if(res.confirm){
                        wx.switchTab({//这里不能使用wx.navigateTo,swithchTab才可以跳到Tab页面
                            url:"/pages/usercenter/usercenter",
                        })
                    }
                }
            })
        }
       
    }
})