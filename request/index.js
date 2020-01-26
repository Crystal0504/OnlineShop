export const request=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}