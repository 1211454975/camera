// pages/index/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardList: {
      type: Array
    }
  },
  observers:{
    "cardList": function(newV) {
      console.log("cardList", newV)
      if(!newV)return;
      newV.map(item => {
        if(item.tags){
          let temp = item.tags.split(";")
          item.tags = temp
        }
        return item;
      })
      
      this.setData({
        curList:newV
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    curList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail: function(e) {
      console.log("toDetail",e)
      let item = e.currentTarget.dataset.item;
      this.triggerEvent("selected", item,{})
    }
  }
})
