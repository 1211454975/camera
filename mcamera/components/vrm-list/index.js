// components/vrm-list/index.js
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
    "list": function(newV){
      this.setData({
        vrmList:newV
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    vrmList:[],
    addVisible:false,
    addTitle:"添加",
    name:"",
    url:"",
    urlList:[]
  },
  lifetimes:{
    ready(){
      this.setData({
        vrmList: this.data.list
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleSelect(evt){
      console.log("handleSelect:",evt)
      let vrm = {id:1,url:"",name:"default",type:"public"}
      this.triggerEvent("select", vrm)
    },
    handleAdd(evt){
      this.setData({
        addVisible:true
      })
    },
    //真正完成文件上传
    afterRead(event) {
      const { file } = event.detail;
      // 上传完成需要更新 fileList
      const { urlList = [] } = this.data;
      urlList.push({ ...file, url: "" });
      this.setData({ urlList });

      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      // wx.uploadFile({
      //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      //   filePath: file.url,
      //   name: 'file',
      //   formData: { user: 'test' },
      //   success(res) {
      //     // 上传完成需要更新 fileList
      //     const { fileList = [] } = this.data;
      //     fileList.push({ ...file, url: res.data });
      //     this.setData({ fileList });
      //   },
      // });
    },
    //提交表单，应该把数据传递给父组件来完成实际提交
    submitForm(){
      if(this.data.urlList.length<=0){
        wx.showToast({
          title: '请上传文件',
        })
        return;
      }
      if(this.data.name == ""){
        wx.showToast({
          title: '请填写名字',
        })
        return;
      }
      let formData = {
        name: this.data.name,
        url:this.data.urlList[0]
      }
      this.triggerEvent("addObject", formData)
    }
  }
})
