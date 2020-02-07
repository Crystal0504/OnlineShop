// pages/pay/index.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
} from "../../utils/aysncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { request } from "../../request/index.js";

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v=>v.checked);
    this.setData({
      address
    });
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  //支付
  async handleOrderPay(){
    try {
      const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    // console.log("111");
    const header = {Authorization:token}
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    const orderParams = {order_price,consignee_addr,goods}
    const {order_number} = await request({
      url:"https://api.zbztb.cn/api/public/v1/my/orders/create",
      method:"post",
      data:orderParams,
      header
    });
    // console.log(order_number);
    const {pay} = await request({
      url:"https://api.zbztb.cn/api/public/v1/my/orders/req_unifiedorder",
      method:"post",
      data:{order_number},
      header
    });
    // console.log(res);
    await requestPayment(pay);
    // console.log(res);
    const res = await request({
      url:"https://api.zbztb.cn/api/public/v1/my/orders/chkOrder",
      method:"post",
      data:{order_number},
      header
    });
    await showToast({
      title:"支付成功"
    });
    //删除购物车中已支付的商品
    let newCart = wx.getStorageSync("cart");
    newCart = newCart.filter(v=>!v.checked);
    wx.setStorageSync("cart", newCart);
      
    wx.navigateTo({
      url: '/pages/order/index'
    });
      
    // console.log(res);
    } catch (error) {
      await showToast({
        title:"支付失败"
      });
      console.log(error);
    }
  }
})