// pages/category/index.js

//0.引入用来发送请求的方法
import {
  request
} from "../../request/index.js";

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
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCates();
  },

  //获取分类数据

  getCates() {
    request({
      url: "https://api.zbztb.cn/api/public/v1/categories"
    }).then(res => {
      // console.log(res);
      this.Cates = res.data.message;

      //构建左侧大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name);
      //构造右侧商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      });
    })
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
      rightContent
    });
  }
})