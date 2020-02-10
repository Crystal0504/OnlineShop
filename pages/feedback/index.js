// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品,商家投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal: ""
  },
  UpLoadImgs: [],
  handeleTabsItemChange(e) {
    // console.log(e);
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  //选择图片
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        // console.log(result);
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });

  },
  //删除图片
  handleRemoveImg(e) {
    const {
      index
    } = e.currentTarget.dataset;
    // console.log(index);
    let {
      chooseImgs
    } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })

  },
  //文本域
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    });
  },
  //提交按钮
  handleFromSubmit() {
    const {
      textVal,
      chooseImgs
    } = this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    //准备上传图片到服务器
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://imgchr.com/upload',
          filePath: v,
          name: "file",
          formData: {},
          success: (result) => {
            // console.log(result);
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);
            console.log(this.UpLoadImgs);
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              // console.log("提交成功");
              this.setData({
                textVal: "",
                chooseImgs: []
              });
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });

      });
    } else {
      console.log("11");
      wx.navigateBack({
        delta: 1
      });

    }


  }

})