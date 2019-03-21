// miniprogram/pages/listApproval.js

//初始化数据库
wx.cloud.init();
const db = wx.cloud.database({
  env:'shade'
});

Page({
  data: {
    progressList: [],
    examState: ["未审批", "撤回", "未通过", "通过"],
    status: ''
  },
  onLoad: function(options) {
    //openid的getter
    function getOpenid() {
      let app = getApp();
      let openid = app.loginState.openid
      return openid;
    }

    const PAGE = this; // 使得get回调函数可以访问this.setData
    // 获取db数据
    console.log(getOpenid());
    db.collection('forms').get({
      success(e) {
        console.log(e, e.data);
        PAGE.setData({
          progressList: e.data || []
        });
        console.log(PAGE.data);
      },
      fail: console.error
    });
  }
})