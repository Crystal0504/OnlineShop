// pages/goods_detail/index.js
import {
  request
} from "../../request/index.js";

import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {

    },
    isCollect: false
  },
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPages = pages[pages.length - 1];
    let options = currentPages.options;


    const {
      goods_id
    } = options;
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);



  },
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "https://api.zbztb.cn/api/public/v1/goods/detail",
      data: {
        goods_id
      }
    });
    this.GoodsInfo = goodsObj;

    //获取缓存中收藏的商品
    let collect = wx.getStorageSync("collect") || [];
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
    // console.log(res);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      },
      isCollect
    })
  },
  handlePrevewImage(e) {
    // console.log("111");
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });

  },
  handleCartAdd() {
    // console.log("111");
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      // 购物车不存在
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;

      cart.push(this.GoodsInfo);
    } else {
      // 购物车中已有
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    });

  },
  //收藏
  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '已取消收藏',
        icon: 'success',
        mask: true
      });

    } else {
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        mask: true
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  }
})