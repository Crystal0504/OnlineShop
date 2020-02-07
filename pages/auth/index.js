// pages/auth/index.js
import {
  request
} from "../../request/index.js";

import regeneratorRuntime from "../../lib/runtime/runtime";
import { login } from "../../utils/aysncWx.js";
Page({
  //获取用户信息
  async handleGetUserInfo(e){
    try {
      // console.log(e);
    const {encrypteData,rawData,iv,signature} = e.detail;
    const {code} = await login();
    const loginParams = {encrypteData,rawData,iv,signature,code}
    // console.log(code);
    const {token} = await request({
      url:"https://api.zbztb.cn/api/public/v1/users/wxlogin",
      data:loginParams,
      method:"post"
    });
    // console.log(res);
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
    } catch (error) {
      console.log(error);
    }
      
      
    
    
      
  }
})