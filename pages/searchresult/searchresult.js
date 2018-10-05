Page({
    data:{
      searchResult:[]
    },
    onShow:function(){
       let searchResultCache = wx.getStorageSync("searchResult"); 
       this.setData({
         searchResult:searchResultCache
       });
    }
})