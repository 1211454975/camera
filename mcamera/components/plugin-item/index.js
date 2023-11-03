// components/plugin-item/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    attached(){
      console.log("item:", this.data.item)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})