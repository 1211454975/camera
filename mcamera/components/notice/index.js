/**
 * msgList as param
 */
Component({
    /**
   * 组件的属性列表
   */
  properties: {
    noticeList: {
      type: Array
    }
  },
  observers:{
    "noticeList":function(newV){
      console.log("notice==>", newV)
      this.setData({
        msgList:newV
      })
    }
  },
  data: {
    msgList: [
      { url: "url", title: "公告：智能运动APP正式上线了。" },
      { url: "url", title: "公告：有一大堆优惠活动，欢迎使用。" },
      { url: "url", title: "公告：有新增功能了。" }]
  },
  
})
