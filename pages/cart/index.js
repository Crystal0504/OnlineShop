// pages/cart/index.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
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
    this.setData({
      address
    });
    this.setCart(cart);
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
  },
  //商品的选中
  handItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    // console.log(goods_id);
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  setCart(cart) {
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
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync("cart", cart);

  },
  //商品全选
  handleItemAllCheck() {
    let {
      cart,
      allChecked
    } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  //商品数量编辑
  async handleItemNumEdit(e) {
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    // console.log(operation,id);
    let {
      cart
    } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    // 判断是否删除
    if (cart[index].num === 1 && operation === -1) {
      // 弹窗提醒
      const res = await showModal({
        content: '是否删除该物品'
      });
      if (res.confirm) {
        // console.log('用户点击确定');
        cart.splice(index, 1);
        this.setCart(cart);
      } else {
        // console.log('用户点击取消');
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  //商品结算
  async handlePay() {
    const {
      address,
      totalNum
    } = this.data;
    //判断是否选择了商品
    if (totalNum === 0) {
      await showToast({
        title: "还未选择商品"
      });
      return;
    }
    // 判断是否选择收货地址
    if (!address.userName) {
      await showToast({
        title: "还未选择收货地址"
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });

  }
})