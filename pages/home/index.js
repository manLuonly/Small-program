//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    begin: '杭州',
    end: '北京',
    date: '2019年1月10日',
    items: [
      {  value: '只看高铁/动车' },
      {  value: '学生票'},
      {  value: '兑换车次' },
    ],
    history: [
      { value: '南宁东-深圳北' },
      { value: '深圳北-南宁东' },
      { value: '广州南-南宁东' },
    ],
    // swiper: [
    //   { images:'/icon/1.png',value: '正晚点'},
    // ]
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  // 删除历史记录
  delete() {
    this.setData({
      history:''
    })
  },
  
  formSubmit: function (e) {
    console.log(e)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.navigateTo({
      url: '../list/list?beginCity=' + e.detail.value.beginCity + "&endCity=" + e.detail.value.endCity + "&leaveDate=" + e.detail.value.leaveDate,
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  onLoad: function (options) {
    if (this.data.date == null || this.data.date.trim() == "") {
      var day = new Date()
      day.setTime(day.getTime() + 24 * 60 * 60 * 1000);
      var year = day.getFullYear();       //年
      var month = day.getMonth() + 1;     //月
      var day = day.getDate();            //日

      if (month < 10) { month = "0" + month; }
      if (day < 10) { day = "0" + day; }
      this.setData({ date: year + '-' + month + '-' + day })
    }
  }, onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  }, bindBeginCityView: function () {
    wx.navigateTo({
      url: '../city/city?cityType=begin',
    })
  }, bindEndCityView: function () {
    wx.navigateTo({
      url: '../city/city?cityType=end',
    })
    // 并没有从app中获取默认值,而是从当前页面获取的
  }, onShow: function () {
     this.setData({ begin: app.globalData.trainBeginCity },() =>{
       console.log(this.data.begin)
     })
    this.setData({ end: app.globalData.trainEndCity }, () =>{
      console.log(this.data.end)
    })
    this.setData({leaveDate: app.globalData.trainleaveDate}, () =>{
      console.log(this.data.data)
    })
  },



  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
