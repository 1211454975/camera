
const GestureState = {
  POSSIBLE: 0, // 0 此时手势未识别，如 panDown等
  BEGIN: 1, // 1 手势已识别
  ACTIVE: 2, // 2 连续手势活跃状态
  END: 3, // 3 手势终止
  CANCELLED: 4, // 4 手势取消，
}

const InteractionState = {
  INITIAL: 0,
  ANIMATING: 1,
  UNFOLD: 2,
  SCROLL: 3,
  RESET: 4,
}

const clamp = (num, min, max) => {
  'worklet'
  return Math.min(Math.max(num, min), max)
}
Page({
  data:{
    x: 0,
    y: 0,
  },
  onLoad() {
    const offset = wx.worklet.shared(10);
    this.applyAnimatedStyle('.circle', () => {
      'worklet';
      return {
        transform: `translateX${offset.value}px`
      };
    });
    this._offset = offset;
    //console.log("onLoad", offset)
  },
  handlepan(evt) {
    'worklet';
    if (evt.state === GestureState.ACTIVE) {
      this._offset.value += evt.deltaX;
    }
    console.log("handleEvt",evt)
    var x = evt.absoluteX;
    var y = evt.absoluteY;
    wx.worklet.runOnJS(this.updatePosition)(x,y)
  },
  updatePosition(x,y){
    this.setData({
      x:x,
      y:y
    })
  }
});