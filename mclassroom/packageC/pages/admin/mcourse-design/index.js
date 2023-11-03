/**
 * 这个设计功能主要为作为管理模块调用的。
 * 因为访问后台的URL对应的是teacher模块
 */
const {getHot,getRecomment,request} = require("../../utils/API")
const app = getApp();
const BaseBehavior = require("../../behaviors/BaseBehavior")

Page({
  behaviors:[BaseBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    mcourse:{},
    toView: 'green',
    panels:[{
      id:0,
      title:"panel0",
      widgets:[]
    },{
      id:1,
      title:"panel1",
      widgets:[]
    },{
      id:2,
      title:"panel2",
      widgets:[]
    },{
      id:3,
      title:"panel3",
      widgets:[]
    },{
      id:4,
      title:"panel4",
      widgets:[]
    }],
    panelId: 0,// 当前操作的面板
    showPanel: false,//是否显示新建Panel对话框
    showWidget: false,
    showPicker:false,
    type:"",
    types:[{ text: '杭州', disabled: true },
    { text: '宁波' },
    { text: '温州' }],

    actions: [{
        name: 'Text',
      },{
        name: 'Gauge',
      },{
        name: 'Sparkline',
      },{
        name:"Pointer"
      },{
        name:"Picture"
      },{
        name:"IndicatorLight"
      },{
        name:"BaiduMap"
      },{
        name:"GaodeMap"
      },{
        name:"Html"
      }],
      refCol:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("design.onLoad==>", options)
    let mcourse = JSON.parse(options.mcourse||"{}")
    this.setData({
      mcourse:mcourse
    })
    this.setData({
      panels: JSON.parse(mcourse.content||"[]")
    })
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
    this.back();
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
  //////////////////////整个仪表盘设计功能/////////////////////////
  handleMenuSelected(evt){
    console.log("handleMenuSelected", evt)
    let menu = evt.detail;
    if(menu.code == "add"){
      this.handleAddMenu()
    }
    if(menu.code == "save"){
      this.handleSaveMenu()
    }
    if(menu.code == "load"){
      this.handleLoadMenu()
    }
  },
  //添加菜单功能
  handleAddMenu(){
    console.log("handleAddMenu")
    let panels = this.data.panels;
    panels.push({
      id:panels.length,
      title: "title"+panels.length
    })
    this.setData({
      panels:panels
    })
    //打开一个对话框
    // this.setData({
    //   showPanel:true
    // })
  },
  //保存菜单功能
  async handleSaveMenu(){
    let content = JSON.stringify(this.data.panels)
    let dash = this.data.dash
    dash.content = content
    if(Array.isArray(dash.tags))
      dash.tags = dash.tags.join(";")
    if(dash.isSys=='启用')
    dash.isSys= 1
    let res = await request({
      url:"tCenter/dash/save",
      method:"post",
      data:dash
    })
    console.log("handleSaveMenu", dash, res)
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    this.setData({
      dash:dash
    })
    wx.showToast({
      title: '保存成功',
    })
  },
  //加载菜单功能
  handleLoadMenu(){
    wx.showToast({
      title: '正在建设中...',
    })
  },
  onCloseAddPanel(evt){

  },
  onConfirmAddPanel(evt){

  },
  ///////////////////////////面板中菜单处理///////////////////////
  /**
   * 处理Panel本身的菜单功能
   * */ 
  handlePanelMenu(evt){
    console.log("handlePanelMenu",evt)
    let menu = evt.detail;
    let panelId = evt.currentTarget.dataset.index;
    if(menu =="add"){
      this.handlePanelAddMenu(panelId);
    }
    if(menu == "setting"){
      this.handlePanelSettingMenu(panelId)
    }
    if(menu == "delete"){
      this.handlePanelDeleteMenu(panelId)
    }
  },
  //1.添加widget
  handlePanelAddMenu(panelId){
    console.log("handlePanelAddMenu",panelId)
    this.setData({
      showWidget:true,
      showPanel:true,
      panelId: panelId
    })
    // let panels = this.data.panels;
    // let panel = panels[panelId]
    // let len = panel.widgets.length;
    // let sortIcon = len==0?"arrow-down":"arrow-up"
    // panel.widgets.push({
    //   id: len,
    //   title:"title"+len,
    //   sortIcon:sortIcon
    // })
    // this.setData({
    //   panels:panels
    // })
    
  },
  //2.panel设置
  //3.panel删除

  // 滚动窗口方法
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  handleType(){
    console.log("handleType click")
    this.setData({
      showPicker:true
    })
  },
  handleShowPicker(evt){
    this.openType(evt)
  },
  openType(evt){
    console.log("evt",evt)
    let refCol = evt.detail
    this.setData({
      showPicker:true,
      refCol:refCol
    })
  },
  onPickerChange(evt){
    console.log("onPickerChange",evt)
    this.setData({
      showPicker:false
    })
    
  },
  onClose() {
    this.setData({ showPicker: false });
  },

  onSelect(event) {
    console.log("onSelect",event.detail);
    this.setData({
      type: event.detail.name,
      showPicker:false
    })
    let addWidgetComp = this.selectComponent("#addWidget")
    addWidgetComp.setSelectedItem(this.data.refCol,event.detail)
  },

  submitWidgetForm(evt){
    console.log("submitWidgetForm", evt)
    let widgetFormData = evt.detail
    let panels = this.data.panels;
    let panel = panels[this.data.panelId]
    if(!panel.widgets)panel.widgets = []
    let len = panel.widgets.length;
    widgetFormData.id = len
    panel.widgets.push(widgetFormData)
    this.setData({
      panels:panels,
      showWidget:false
    })
    
  },
  getPanel(){
    //根据panelId获取panel对象
    return this.data.panels[this.data.panelId]
  }
})