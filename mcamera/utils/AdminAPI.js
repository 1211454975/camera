let baseUrl = "http://60.204.152.95:8106/app/"
let wxappId = 1
let comId = 1


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
        'access-token': wx.getStorageSync("admin-token"),
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

module.exports = {
  request
}