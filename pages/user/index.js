// pages/user/index.js
Page({
  data: {
    userinfo: {},
    collectNums: 0
  },
  onShow() {
    const collect = wx.getStorageSync("collect") || [];

    const userinfo = wx.getStorageSync("userinfo");
    this.setData({
      userinfo,
      collectNums: collect.length
    });
  }
})