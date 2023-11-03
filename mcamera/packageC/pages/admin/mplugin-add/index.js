const {request} = require("../../../../utils/AdminAPI")
const app = getApp()
const BaseBehavior = require("../../../../behaviors/BaseBehavior")
Page({
  behaviors: [BaseBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    showCate: false,//是否显示类别卡片选项
    showUsage:false,//
    cateList:[],//类别字典
    usageList:[],//用途字典
    cate:{},
    usage:{},
    formData: {
      cateId:0,
      cateName:"",
      name:"",
      content:"",
      tags:"",
      cover:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("mplugin-add.onLoad", options)
    //考虑编辑
    let mcourse = null;
    if(options.mcourse)mcourse = JSON.parse(options.mcourse)
    if(mcourse){
      this.setData({
        formData:mcourse
      })
    }
    this.initCateData()
    this.initUsageData()
  },
  async initCateData(){
    let res = await request({
      url:"tCenter/plugincate/listall"
    })
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    this.setData({
      cateList:res.data
    })
    console.log("initCateData", res)
  },
  async initUsageData(){
    let res = await request({
      url:"tCenter/pluginusage/listall"
    })
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    this.setData({
      usageList:res.data
    })
    console.log("initUsageData", res)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.back()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  //显示Cate选择框
  handleCate(evt){
    this.setData({
      showCate:!this.data.showCate
    })
    console.log("handleCate", this.data.showCate)
  },
  onSelectCate(evt){
    console.log("onSelectCate", evt)
    let formData = this.data.formData
    formData.cateId = Number(evt.detail.id)
    formData.cateName = evt.detail.name
    this.setData({
      formData:formData,
      showCate: false
    })
  },

  //显示Usage下拉框
  handleUsage(evt){
    this.setData({
      showUsage:!this.data.showUsage
    })
    console.log("handleUsage", this.data.showUsage)
  },
  onSelectUsage(evt){
    console.log("onSelectUsage", evt)
    let formData = this.data.formData
    formData.usageId = Number(evt.detail.id)
    formData.usageName = evt.detail.name
    this.setData({
      formData:formData,
      showUsage: false
    })
  },
  
  formItemChange(evt){
    let formData = this.data.formData
    formData[evt.currentTarget.dataset.type] = evt.detail
    this.setData({
      formData:formData
    })
  },
  async handleSubmit(evt){
    console.log("handleSubmit:", evt, this.data.formData)
    let data = this.data.formData
    let res = await request({
      url:"tCenter/mplugin/save",
      method:"post",
      data: data
    })
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    wx.navigateBack();
  }
})