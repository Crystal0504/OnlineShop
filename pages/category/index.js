// pages/category/index.js

//0.引入用来发送请求的方法
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
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getCates();
    // 0.web中的本地存储和小程序中的本地存储的区别
      // 1.方式不同
        // 1.web：localStorage.setItem("key","value") localStorage.getItem("key")
        // 2.小程序：wx.setStorageSync(key, data) wx.getStorageSync("key")
      // 2.数据类型转换
          // 1.web:不管存入的是啥数据，都会先调用toString()方法，把数据转换成字符串再存入
          // 2.小程序:不存在类型转换的这个操作，存进去是啥就是啥
    // 1.获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    // 2.判断
    if(!Cates){
      //不存在数据
      this.getCates();
    }else{
      // 存在数据
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCates();
      }else{
        // 可以使用旧数据
        console.log("可以使用旧数据");
      }
    }
  },

  //获取分类数据

  async getCates() {
    // request({
    //   url: "https://api.zbztb.cn/api/public/v1/categories"
    // }).then(res => {
    //   // console.log(res);
    //   this.Cates = res.data.message;
    //   // 把接口数据存入本地
    //   wx.setStorageSync("Cates",{time:Date.now(),data:this.Cates});
    //   //构建左侧大菜单数据
    //   let leftMenuList = this.Cates.map(v => v.cat_name);
    //   //构造右侧商品数据
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   });
    // })

    const res = await request({url:"https://api.zbztb.cn/api/public/v1/categories"});
      // console.log(res);
      this.Cates = res;
      // 把接口数据存入本地
      wx.setStorageSync("Cates",{time:Date.now(),data:this.Cates});
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