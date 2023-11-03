module.exports = Behavior({
  data: {
    
  },
  attached: function(){},
  methods: {
    back(){
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; // 获取上一个页面实例对象
      var delta = pages.length - prevPage.index - 1; // 计算需要返回的页面数
      // return {delta,prevPage}
      //强制刷新
      prevPage.onLoad({})
    }
  }
})