// pages/cart/index.js
import { getSetting,chooseAddress,openSetting } from "../../utils/aysncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  data:{
    address:{}
  },
  onShow(){
    const address = wx.getStorageSync("address");
      this.setData({
        address
      })
  },
  
    // 点击收货地址按钮触发的事件
  async handleChooseAddress(){
    try {
    // console.log("111");
    //获取权限状态
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    //判断权限状态
    if(scopeAddress===false){
     //诱导用户打开权限
     await openSetting();
    }
     //调用收货地址api
     let address = await chooseAddress();
    //  console.log(address);
    address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
    //存入缓存
    wx.setStorageSync("address",address);
      
  }catch (error) {
    console.log(error);
  }
}
})