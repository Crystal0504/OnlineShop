// pages/search/index.js
import {
  request
} from "../../request/index.js";

import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    Timeid: -1,
    isFocus: false
  },
  //输入框
  handleInput(e) {
    // console.log(e);
    //获取输入框的值
    const {
      value
    } = e.detail;
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false,
        inpValue: ""
      })
      return;
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.Timeid);
    this.Timeid = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  async qsearch(query) {
    const res = await request({
      url: "https://api.zbztb.cn/api/public/v1/goods/qsearch",
      data: {
        query
      }
    });
    // console.log(res);
    this.setData({
      goods: res
    })
  },
  //点击取消
  handleCancel() {
    this.setData({
      inpValue: "",
      goods: [],
      isFocus: false,
    })
  }
})