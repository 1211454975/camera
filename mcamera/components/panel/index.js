// components/panel/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    panel:{
      type:Object,
      value: {widgets:[]}
    }
  },
  observers:{
    "panel":function(newV){
      let v = newV
      if(!v.widgets)v.widgets=[]
      this.setData({curPanel: v})
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    curPanel:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePanelMenu(evt){
      let panelMenu = evt.currentTarget.dataset.menu;
      console.log("handlePanelMenu in panel",evt)
      this.triggerEvent("panelMenuSelected", panelMenu)
    }
  }
})
