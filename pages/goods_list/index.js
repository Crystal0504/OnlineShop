// pages/goods_list/index.js
import {
  request
} from "../../request/index.js";

import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList:[]
  },

  // 接口调用参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList(){
    const res=await request({
      url:"https://www.fastmock.site/mock/dec21e0a575c58c9670aee9e8a38c6f8/OnlineShop/goods/search",
      data:this.QueryParams
    });

    //计算总页数
    const total=res.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    // console.log(this.totalPages);
    
    // console.log(res);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
  },

  handeleTabsItemChange(e){
    // console.log(e);
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  onReachBottom(){
    // console.log("111");
    if(this.QueryParams.pagenum>=this.totalPages){
      // console.log("没有下一页");
      wx.showToast({
        title: '没有下一页了'
      });
        
    }else{
      // console.log("有下一页");
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  }
})