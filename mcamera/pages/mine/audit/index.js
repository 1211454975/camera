Page({
  data:{
    tabList:[],
    tabId:'',
    contentList:[],
    isTriggered:false
  },
  onLoad(){
    this.getTabList();
  },
  changeTab(e){
    const tabId = e.target.id;
    const contentList = this.getContentList(tabId);
    this.setData({contentList,tabId})
  },
  getTabList(){
    let result = [
      {"id": "tab_1","name": "美食"},
      {"id": "tab_2","name": "健身"},
      {"id": "tab_3","name": "电影"},
      {"id": "tab_4","name": "酒店"},
      {"id": "tab_5","name": "景点"},
      {"id": "tab_6","name": "超市",},
      {"id": "tab_7","name": "水果"},
      {"id": "tab_8","name": "生鲜"},
      {"id": "tab_9","name": "烟酒"},
      {"id": "tab_10","name": "买药",},
      {"id": "tab_11","name": "培训"},
      {"id": "tab_12","name": "养车"},
      {"id": "tab_13","name": "家居"},
      {"id": "tab_14","name": "宠物"},
      {"id": "tab_15","name": "游戏"}
    ]
    this.setData({
      tabList:result,
      tabId:result[0].id,
      contentList:this.getContentList(result[0].id)
    })
  },
  getContentList(tabId=""){
    let result = ["其他","其他","其他","其他","其他"];
    if(tabId.indexOf("1") > -1){
      result = ["肯德基宅急送","云海肴","西贝莜面村","眉州东坡","华莱士"];
    }else if (tabId.indexOf("2") > -1){
      result = ["游泳","武术搏击","瑜伽","羽毛球","篮球"];
    }else if(tabId.indexOf("3") > -1){
      result = ["少年巴比伦","地久天长","爱情神话","钢铁侠","功夫熊猫"]
    }
    this.setData({isTriggered:false})
    return result;
  },
  handleRefresherRefresh(){
    console.log("handle refresher refresh")
    this.getContentList(this.data.tabId)
  },
  handleScrollToLower(){
    console.log("handle scroll to lower");
    const temp = this.getContentList()
    const newContentList = [...this.data.contentList,...temp];
    this.setData({contentList:newContentList})
  }
})
