import PoseData from "../../libs/PoseData"
import MotionBase from "../../libs/MotionBase"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rule:{
      key:"XXX",
      name:"XXX",
      rule:"XXX",
      type:"count",
    },
    togglePluginDialog:false,
    ruleList:[],
    toView: 'green',
    test:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      rule: JSON.parse(options.rule||"{}")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.init()
  },
  init(){
    var title = this.data.rule.name;
    title += this.data.rule.type=='count'?'-计数':'-计时'
    wx.setNavigationBarTitle({
      title: title,
    })
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
  //获取所有的插件数据
  getPluginList(){
    let list = [
      {
        key:"XXX",
        name:"XXX",
        rule:"XXX",
        type:"count",
      },{
        key:"001",
        name:"001",
        rule:"001",
        type:"count",
      },{
        key:"002",
        name:"002",
        rule:"002",
        type:"count",
      },{
        key:"003",
        name:"003",
        rule:"003",
        type:"count",
      },{
        key:"004",
        name:"004",
        rule:"004",
        type:"count",
      },{
        key:"005",
        name:"005",
        rule:"005",
        type:"count",
      },{
        key:"006",
        name:"006",
        rule:"006",
        type:"count",
      },{
        key:"007",
        name:"007",
        rule:"007",
        type:"count",
      },{
        key:"008",
        name:"008",
        rule:"008",
        type:"count",
      },{
        key:"009",
        name:"009",
        rule:"009",
        type:"count",
      }
    ]
    return list;
  },
  handleTogglePlugin(){
    if(!this.data.togglePluginDialog){
      this.setData({
        ruleList: this.getPluginList()
      })
    }
    this.setData({
      togglePluginDialog: !this.data.togglePluginDialog
    })
    
    console.log("toggle-plugin", this.data.ruleList)
  },
  upper(e) {

    console.log(e)

  },

  lower(e) {

    console.log(e)
    let list = this.data.ruleList;
    list = [...list,...this.getPluginList()]
    this.setData({
      ruleList:list
    })

  },

  scroll(e) {

    console.log(e)

  },

  scrollToTop() {

    this.setAction({

      scrollTop: 0

    })

  },
  handleSelectPlugin(event){
    let curRule = event.currentTarget.dataset.item;
    console.log("handleSelectPlugin", curRule)
    this.setData({
      rule:curRule
    })    
    //关闭对话框
    this.setData({
      togglePluginDialog: !this.data.togglePluginDialog
    })
    //重新初始化
    this.init()
  },

  ///TEST
  handleTest(event){
    console.log("handleTest")
    this.setData({
      test:!this.data.test
    })
  },
  //计时测试
  handleTimeMotion(event){
    let def = [{name:"angleOfHip",op:"geq",value:1}]
    let rule={
      key:1,
      name:"test",
      type:"time",
      def: JSON.stringify(def)
    }
    let mb = new MotionBase(rule.key,rule.name,rule.type,rule.def)
    
    let pd = new PoseData()
    let poseData = pd.mock()
    mb.check(poseData,(res)=>{
      console.log("res==>", res)
    })
    poseData = pd.mock()
    mb.check(poseData,(res)=>{
      console.log("res==>", res)
    })
    
  },

  //计数测试
  handleCountMotion(event){
    let def = [
      [{name:"angleOfUpperShoulder",op:"geq",value:0.58}],
      [{name:"angleOfUpperShoulder",op:"leq",value:0.52}]
    ]
    let rule={
      key:1,
      name:"test",
      type:"count",
      def: JSON.stringify(def)
    }
    let mb = new MotionBase(rule.key,rule.name,rule.type,rule.def)
    
    let pd = new PoseData()
    let poseData = pd.mock()
    mb.check(poseData,(res)=>{
      console.log("res==>", res)
    })
    poseData = pd.mock1()
    mb.check(poseData,(res)=>{
      console.log("res==>", res)
    })
    
  },
})