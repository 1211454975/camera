// components/tool-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    enableOpenSetting:false,
    visible:false,
    title:"demo",
    curIndex: 0,
    menus:[{
      title:"化身设置",
      code:"avatar",
      icon:"avatar",
      action:"avatarSetting",
      dlgVisible: false,
    },{
      title:"背景设置",
      code:"background",
      icon:"background",
      action:"bgSetting",
      dlgVisible:false
    },{
      title:"饰品设置",
      code:"decoration",
      icon:"decoration",
      action:"decorationSetting",
      dlgVisible:false
    },{
      title:"道具设置",
      code:"item",
      icon:"item",
      action:"itemSetting",
      dlgVisible:false
    },{
      title:"系统设置",
      code:"system",
      icon:"system",
      action:"systemSetting",
      dlgVisible:false
    }],
    recorderMenus:[{
      title:"启动",
      code:"start",
      icon:"start",
      action:"start",
      dlgVisible:false
    },{
      title:"停止",
      code:"stop",
      icon:"stop",
      action:"stop",
      dlgVisible:false
    },{
      title:"暂停",
      code:"pause",
      icon:"pause",
      action:"pause",
      dlgVisible:false
    },{
      title:"测试",
      code:"test",
      icon:"test",
      action:"test",
      dlgVisible:false
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    avatarSetting(evt){
      this.commonSetting(evt)
    },
    bgSetting(evt){
      this.commonSetting(evt)
    },
    decorationSetting(evt){
      this.commonSetting(evt)
    },
    itemSetting(evt){
      this.commonSetting(evt)
    },
    systemSetting(evt){
      this.commonSetting(evt)
    },
    cameraSetting(evt){
      this.commonSetting(evt)
    },
    commonSetting(evt){
      console.log("evt==>",evt)
      let menuIndex = evt.currentTarget.dataset.index;
      let menus = this.data.menus;
      menus[menuIndex].dlgVisible = true
      this.setData({
        curIndex: menuIndex,
        menus: menus,
        title:menus[menuIndex].title
      })
    },
    start(evt){
      //检查虚拟相机是否已经打开，如果打开，则建立虚拟相机捕获的数据与化身的互动
      //同时准备将这些数据保存起来
      wx.showToast({
        title: 'action is ok',
      })
    },
    stop(evt){
      //将这些数据保存到数据库中
      wx.showToast({
        title: 'action is ok',
      })
    },
    pause(evt){
      //通知动作捕作。但是相关的数据对象需要继续保留。
      //再此点击，表示继续录制
      wx.showToast({
        title: 'action is ok',
      })
    },
    test(evt){
      this.triggerEvent("test")
    },
    // 公共设置事件处理
    handleSysSettingChange(setting){
      console.log("handleSysSetting", setting)
      this.triggerEvent("settingChange", setting.detail);
    },
    // 化身变更事件处理
    handleVrmChange(newAvatar){
      console.log("handleAvatarChange", newAvatar)
      this.triggerEvent("vrmChange", newAvatar);
    },
    // 背景变更事件处理
    handleBackgroundChange(newBg){
      console.log("handleBackgroundChange", newBg)
      this.triggerEvent("backgroundChange", newBg.detail);
    },
    // 饰品变更事情处理
    handleDecorationChange(newBg){
      console.log("handleBackgroundChange", newBg)
      this.triggerEvent("backgroundChange", newBg.detail);
    },
    // 道具变更事件处理
    handleItemChange(newItem){
      console.log("handleItemChange", newItem)
      this.triggerEvent("itemChange", newItem.detail);
    },
    // 相机切换
    handleCameraChange(){

    }
  }
})
