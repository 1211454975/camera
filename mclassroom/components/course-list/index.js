// components/course-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },
  observers:{
    "list":function(newV){
      console.log("course-list==>", newV)
      this.setData({
        curList:newV
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    curList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
