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

    }
  },
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    // console.log(res);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      }
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
  handleCartAdd(){
    // console.log("111");
    let cart = wx.getStorageSync("cart")||[];
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      // 购物车不存在
      this.GoodsInfo.num = 1;
      cart.push(this.GoodsInfo);
    }else{
      // 购物车中已有
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    });
      
  }
})