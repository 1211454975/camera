/**获取所有的分类动作模板 */
// let baseUrl = "http://192.168.37.9:8106/app/"
let baseUrl = "http://60.204.152.95:8106/app/"
let wxappId = 1
let comId = 1

const getMotionCates = () =>{
  let cates = [{
    name:"基础动作",
    templs:[{
      name:"动作1",
      coverUrl:"",
      remark:""
    },{
      name:"动作2",
      coverUrl:"",
      remark:""
    },{
      name:"动作3",
      coverUrl:"",
      remark:""
    }]
  },{
    name:"网球动作",
    templs:[{
      name:"动作1",
      coverUrl:"",
      remark:""
    },{
      name:"动作2",
      coverUrl:"",
      remark:""
    },{
      name:"动作3",
      coverUrl:"",
      remark:""
    }]
  }]
  return cates;
}
const getHot = () => {
  return wx.request({
    url: baseUrl+"common/dash/hot",
    method:"get",
    success:res=>{
      console.log("hot.res==>", res)
    }
  })
}

const getRecomment = () => {
  return wx.request({
    url: baseUrl+"common/dash/recomment",
    method:"get",
    success:res=>{
      console.log("recomment.res==>", res)
    }
  })
}

const request = (params) => {
  if(!params.method){
    params.method = "GET"
  }
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseUrl + params.url,
      method: params.method,
      data:params.data,
      header: {
        'content-type': 'application/json',
        'access-token': wx.getStorageSync("token"),
        'comId': comId,
        'wxappId': wxappId
      },
      success: (res) => {
        if(res.statusCode == 200)
        resolve(res)
        else reject(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
  
}
// 同步wx.login
const wxLogin = () => {
  return new Promise((reslove) => {
    wx.login({
      success(res) {
        reslove(res.code);
      } 
    })
  })
}

module.exports = {
  getMotionCates,
  getHot,
  getRecomment,
  request,
  wxLogin
}