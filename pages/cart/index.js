// pages/cart/index.js
import {
  getSetting,
  chooseAddress,
  openSetting
} from "../../utils/aysncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
    //全选按钮
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      address,
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
  },

  // 点击收货地址按钮触发的事件
  async handleChooseAddress() {
    try {
      // console.log("111");
      //获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //判断权限状态
      if (scopeAddress === false) {
        //诱导用户打开权限
        await openSetting();
      }
      //调用收货地址api
      let address = await chooseAddress();
      //  console.log(address);
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //存入缓存
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
  }
})