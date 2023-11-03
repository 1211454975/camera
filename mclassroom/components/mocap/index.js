const { THREE, WechatPlatform, GLTFLoader, THREEVRM,VRMLoader,BVHLoader,VRMHelper,OrbitControls } =
  require('../../libs/three-platformize');


Component({
  options: {
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },
  properties:{
    height:{
      type:Number,
      value: 0
    }
  },
  
  data: {
    scene: null,
    renderer: null,
    camera: null,
    this_vrm: null,
    helper:null,
    disposing: false,
    platform: null,
    frameId: -1,
    helper: null,
    bvhLoader:null,
    bvhData:null,
    num_of_clip: 0,
    loc:1,
    rota:3,

    bg:"",
    avatar:"",
    deco:"",
    item:"",
    setting:{},
  },
  lifetimes: {
    
    /**
     * 生命周期函数--监听页面加载
     */
    detached() {
      initShadersDone = false
      console.log("页面detached")
      if (wx.offThemeChange) {
        wx.offThemeChange()
      }
    },
    ready() {
      this.init()
      console.log("ready===>",this.rota)
      let that = this;
      wx.createSelectorQuery().in(this).select('#gl').node().exec((res) => {
        const canvas = this.canvas = res[0].node
  
        this.platform = new WechatPlatform(canvas)
        THREE.PLATFORM.set(this.platform);
  
        const renderer = this.renderer = new THREE.WebGL1Renderer({ canvas, antialias: true, alpha: true })
        // const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
        const camera = this.camera = new THREE.PerspectiveCamera(40.0, canvas.width / canvas.height, 0.1, 200.0);
        const scene = this.scene = new THREE.Scene()
        //this.loadGLTF(scene)
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true
        this.bvhLoader = new BVHLoader()
        that.setData({
          scene:scene,
          renderer:renderer,
          camera:camera,
        })
        // this.loadVRM(scene,camera,renderer, (params) => {
        //   var helper = new VRMHelper(params)
        //   that.helper = helper;
        //   helper.initCharacter()
        // })
        
        camera.position.z = 4
        renderer.outputEncoding = THREE.sRGBEncoding
        scene.add(new THREE.AmbientLight(0xffffff, 1.0))
        const light = new THREE.DirectionalLight(0xffffff, 1.0)
        light.position.set(1.0,1.0,1.0).normalize();
        scene.add(light)
        renderer.setSize(canvas.width, canvas.height)
        renderer.setPixelRatio(THREE.$window.devicePixelRatio)
        const clock = new THREE.Clock();
        const render = () => {
          if (!this.disposing) this.frameId = THREE.$requestAnimationFrame(render)
          controls.update()
          // if(this.helper&&this.pose_content){
          //   this.helper.update(this.pose_content,clock)
          // }
          renderer.render(scene, camera);
        }
        render()      
      })
    },
  },
  methods: {

    init(){
      //设置全局常量
      this.disposing = false
      this.platform = null
      this.frameId = -1
      this.helper = null
      this.bvhLoader = null
      this.bvhData = null
      this.num_of_clip = 0
      this.loc = 1
      this.rota = 3
      //设置画布高度
      const info = wx.getSystemInfoSync()
      if(this.data.height==0){
        this.setData({
          height: info.windowHeight
        })
      }
    },
    loadGLTF(scene){
      const gltfLoader = new GLTFLoader()
      wx.showLoading({ title: '加载模型中' })
      gltfLoader.loadAsync('https://dtmall-tel.alicdn.com/edgeComputingConfig/upload_models/1591673169101/RobotExpressive.glb').then((gltf) => {
        // @ts-ignore
        gltf.parser = null;
        gltf.scene.position.y = -2;
        scene.add(gltf.scene);
        wx.hideLoading()
      })
    },
    importVRM(){
      this.loadVRM(this.scene,this.camera,this.renderer, (params) => {
        var helper = new VRMHelper(params)
        this.helper = helper;
        helper.initCharacter()
      })
    },
    loadVRM(scene,camera,renderer, cb){
      const loader = new VRMLoader()
      wx.showLoading({ title: '加载模型中' })
      // let baseUrl = "https://raw.githubusercontent.com/1211454975/motionsdk_oss/master/models/"
      //https://gitee.com/hawklink/motionsdk_oss/raw/master/logo.png
      // var baseUrl = "http://127.0.0.1:8080/"
      var baseUrl = "http://60.204.152.95:8080/"//"http://31ae08d4.r19.cpolar.top/"
      const model = baseUrl + "shibu_sendagaya.vrm"
      //const model = baseUrl + "shibu_sendagaya.vrm"
      
      loader.loadAsync(model).then((gltf) => {
        // @ts-ignore
        THREEVRM.VRMUtils.removeUnnecessaryJoints(gltf.scene)
        THREEVRM.VRM.from( gltf ).then( (this_vrm) =>{
          scene.add( this_vrm.scene )
          console.log("this_vrm", this_vrm)
          wx.hideLoading()
          if(cb)cb({scene,renderer,camera,this_vrm,THREEVRM, THREE})
          
        } )
        //console.log("vrm model", gltf)
        //gltf.parser = null;
        //gltf.scene.position.y = -2;
        //scene.add(gltf.scene);
        //wx.hideLoading()
        //if(cb)cb(scene,camera,renderer, gltf.userData.gltfExtensions.VRM)
      })
    },
    loadBVH(scene,seq){
      let loader = this.bvhLoader;
      //wx.showLoading({ title: '加载BVH中' })
      // let baseUrl = "https://raw.githubusercontent.com/1211454975/motionsdk_oss/master/models/"
      // let baseUrl = "http://127.0.0.1:8080/"
      let baseUrl = "http://60.204.152.95:8080/"//"http://31ae08d4.r19.cpolar.top/"
      // baseUrl = "http://localhost:8080/"
      let model = baseUrl + "sample_hand1.bvh"
      if(seq=="1")
        model = baseUrl + "sample_rot_left.bvh"
      if(seq=="2")
        model = baseUrl + "sample_rot_right.bvh"
      loader.loadAsync(model).then((bvhData) => {
        // @ts-ignore
        console.log("bvh data", bvhData)
        this.bvhData = bvhData;
        this.helper.execute_bvh(bvhData,(pose_content)=>{
          this.pose_content=pose_content
        })
        
      })
    },

    playWithBVH(event) {
      var seq = event.currentTarget.dataset.seq;
      console.log("playWithBVH:", event)
      if(!this.helper)return;
      this.loadBVH(this.helper.scene, seq)
    },
    reset(){
      if(this.helper){
        //this.helper.initPosition()
        //this.helper.initCharacter()
        this.helper.resetPose()
      }
    },

    /***/
    nearCamera(){
      var camera = this.helper.camera;
      var scene = this.helper.scene;
      camera.position.z = camera.position.z-0.1;
      console.log('z=>',camera.position.z)
      this.helper.renderer.render(scene,camera)
    },
    farCamera(){
      var camera = this.helper.camera;
      var scene = this.helper.scene;
      camera.position.z = camera.position.z+0.1;
      console.log('z=>',camera.position.z)
      
      this.helper.renderer.render(scene,camera)
    },
    test(){
      for(var i=0;i<10;i++)
      setTimeout(this.sendMsg.bind(this,i),i*20)
    },
    sendMsg(location){
      var camera = this.helper.camera;
      //camera.position.z = camera.position.z - location/10
      this.helper.initPosition(0,location,0)
    },
    move(){
      this.loc = this.loc - 0.05;
      this.helper.initPosition(-0.1,  this.loc,  -0.78)
    },
    rotation(){
      //0,         2.93,    0
      this.rota = this.rota - 0.05
      console.log("rotation: ", this.rota)
      this.helper.initRotation([0,  this.rota,  0])
    },
    autoRotation(){
      console.log("auto rotation: ")
      for(var i=0;i<20;i++)
      setTimeout(this.rotation.bind(this), i*20);
    },
    upV(loc){
      loc.i = loc.i+10
      loc.pos.x = loc.pos.x + 1
    },
    upObj(){
      let loc = {i:0,pos:{x:0}}
      for(var i=0;i<20;i++){
        this.upV(loc)
        console.log(`upV:{{i}}:`, loc.i)
        console.log("upV:x:", loc.pos.x)
      }
    },
    stepBVH(){

      //this.helper.updateNeck(this.bvhData,this.num_of_clip)
      //this.num_of_clip += 4

      this.testQuaternion()

    },
    testQuaternion(){
      this.helper.testQuaterion()
      // const _quat = new THREE.Quaternion();
      // let a = new Array(3,4,5,2)
      // _quat.fromArray(a)
      // console.log("_quat=>", a,_quat)
      // var node = this.helper.this_vrm.humanoid.getBoneNode("neck")
      // node.quaternion.fromArray(a)
      // console.log("node=>", node)
      
    },

    //更新各种配置信息
    updateAvatar(avatar){
      this.setData({
        avatar: avatar
      })
    },
    updateBackground(bg){
      this.setData({
        bg:bg
      })
    },
    updateDecoration(deco){
      this.setData({
        deco:deco
      })
    },
    updateItem(item){
      this.setData({
        item:item
      })
    },
    updateSetting(setting){
      this.setData({
        setting:setting
      })
    }
  }
})