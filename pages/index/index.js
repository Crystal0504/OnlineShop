//index.js
import {
  request
} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList: [],
    catesList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //1.发送异步请求获取数据
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //获取轮播图数据
  getSwiperList() {
    request({
      url: "https://www.fastmock.site/mock/dec21e0a575c58c9670aee9e8a38c6f8/OnlineShop/swiperdata"
    }).then(result => {
      // console.log(result);
      this.setData({
        swiperList: result
      })
    })
  },

  //获取导航菜单数据
  getCateList() {
    request({
      url: "https://www.fastmock.site/mock/dec21e0a575c58c9670aee9e8a38c6f8/OnlineShop/catitems"
    }).then(result => {
      // console.log(result);
      this.setData({
        catesList: result
      })
    })
  },

  //获取商品展示数据
  getFloorList() {
    request({
      url: "https://www.fastmock.site/mock/dec21e0a575c58c9670aee9e8a38c6f8/OnlineShop/floordata"
    }).then(result => {
      // console.log(result);
      this.setData({
        floorList: result
      })
    })
  }
})