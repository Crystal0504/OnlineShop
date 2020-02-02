// pages/category/index.js
import {
  request
} from "../../request/index.js";

import regeneratorRuntime from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //商品数据
    rightContent: [],
    //被点击的左侧菜单
    currentIndex: 0,
    //右侧内容滚动条距离顶部的距离
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates();
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates();
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates();
      } else {
        console.log("可以使用旧数据");
      }
    }
  },

  //获取分类数据

  async getCates() {
    const res = await request({
      url: "https://api.zbztb.cn/api/public/v1/categories"
    });
    // console.log(res);
    this.Cates = res;
    // 把接口数据存入本地
    wx.setStorageSync("Cates", {
      time: Date.now(),
      data: this.Cates
    });
    //构建左侧大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    //构造右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    });
  },
  //左侧点击事件
  handleItemTap(e) {
    // console.log(e);
    const {
      index
    } = e.currentTarget.dataset;
    //构造右侧商品数据
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    });
  }
})