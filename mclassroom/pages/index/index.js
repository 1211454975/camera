const {getHot,getRecomment,request} = require("../../utils/API")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImages: [
      'https://gitee.com/hawklink/motionsdk_oss/raw/master/images/banner1.jpg',
      'https://gitee.com/hawklink/motionsdk_oss/raw/master/images/banner2.jpg',
      'https://gitee.com/hawklink/motionsdk_oss/raw/master/images/banner3.jpg'
    ], //轮播图图片数据
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1300,
    bg: '#8fb2c9', //轮播图圆点的颜色
    height:"", //动态设置swiper的高度属性
    recoCardList:[],

    cardList: [
      { id:0, image:'https://gitee.com/hawklink/motionsdk_oss/raw/master/images/course1.jpg', title:'热身动作', num:'100', desc:'', tags:[{title:'推荐'},{title:'热身'},{title:'安全'}], price:'59.00', originPrice:'79.00'},
      { id:1, image:'https://gitee.com/hawklink/motionsdk_oss/raw/master/images/course2.jpg', title:'发球', num:'100', desc:'', tags:[{title:'基础'},{title:'排球'}], price:'10.00', originPrice:'15.00'},
      { id:2, image:'https://gitee.com/hawklink/motionsdk_oss/raw/master/images/course3.jpg', title:'运球', num:'100', desc:'', tags:[{title:'高级'}], price:'6.00', originPrice:'8.00'},
      { id:3, image:'https://gitee.com/hawklink/motionsdk_oss/raw/master/images/course4.jpg', title:'发球', num:'100', desc:'', tags:[{title:'网球'}], price:'10.00', originPrice:'15.00'},
      { id:4, image:'https://gitee.com/hawklink/motionsdk_oss/raw/master/images/course5.jpg', title:'骑行', num:'100', desc:'', tags:[], price:'0.00', originPrice:'0.00'},
    ], // 商品卡片
    
    scrollTop: false, //返回顶部按钮 默认隐藏

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  //获取屏幕宽度，获取图片的宽高，然后等比设置当前屏幕宽度下swiper的高度。
  imgH:function(e){
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh=e.detail.height;　//图片高度
    var imgw=e.detail.width;
    var swiperH=winWid*imgh/imgw + "px"　//等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==> swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
        height:swiperH　//设置高度
    })
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 200) {
      this.setData({
        scrollTop: true
      });
    } else {
      this.setData({
        scrollTop: false
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let token = wx.getStorageSync('token')
    let that = this;
    if(!token){
      app.callbackAfterLogin = async () =>{
        console.log("not launched")
        await that.init()
      }
    }else{
      console.log("已经launched")
      await that.init()
    }
  },
  async init(){
    let that = this
    //1.加载轮播图
    let res = await request({
      url:"sCenter/advertisement",
      data:{type:2}
    })
    console.log("advertisement:",res)
    let swiperImages = res.data.map(item => {return item.cover})
    this.setData({
      swiperImages:swiperImages
    })
    //2.加载推荐的课程
    res = await request({
      url:"sCenter/motioncourse/recommend"
    })
    console.log("recommentd ",res)
    that.setData({
      recoCardList: res.data
    })
    //3.加载热门的课程
    res = await request({
      url:"sCenter/motioncourse/hot"
    })
    console.log("hot ",res)
    that.setData({
      cardList: res.data
    })
    //4.加载公告信息
    res = await request({
      url:"sCenter/advertisement",
      data:{type:5}
    })
    
    that.setData({
      noticeList:res.data
    })
    console.log("noticeList:",that.data.noticeList)

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

  goCourses(){
    wx.reLaunch({
      url: '/pages/courses/index',
    })
  },
  

  /**
   * 
   */
  handleSelected(event){
    console.log("handleSelected", event)
    var cardId = event.detail.cardId;
    var card = this.getCard(cardId)
    //直接跳转到课程播放页面
    // wx.navigateTo({
    //   url: 'plugin://hello-plugin/followme-view?course='+JSON.stringify(card),
    // })
    wx.navigateTo({
      url: '../room/index',
    })
  },
  toDetail(){
    wx.navigateTo({
      url: '../room/index',
    })
  },
  getCard(cardId){
    for(var i=0;i<this.data.cardList.length;i++){
      var card = this.data.cardList[i]
      if(card.id == cardId)return card;
    }
    return {}
  }
})