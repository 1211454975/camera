// pages/index/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardList: {
      type: Array
    },
    selectable:{
      type:Boolean,
      value: false
    },
    editable:{
      type: Boolean,
      value: false
    }
  },
  observers:{
    "cardList":function(newV){
      if(!newV)return;
      newV.map(item => {
        if(item.tags && !Array.isArray(item.tags)){
          let tags = item.tags || ""
          console.log("tags==",tags)
          let temp = tags.split(";")
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
    handleSelected(evt) {
      console.log(evt.currentTarget.dataset.item)
      let item = evt.currentTarget.dataset.item;
      this.triggerEvent("selected", item,{})
    },
    handleDesign(evt){
      let item = evt.currentTarget.dataset.item;
      this.triggerEvent("design", item,{})
    },
    handleEdit(evt){
      let item = evt.currentTarget.dataset.item;
      this.triggerEvent("edit", item,{})
    },
    handleDelete(evt){
      let item = evt.currentTarget.dataset.item;
      this.triggerEvent("delete", item,{})
    }
  }
})
