
export default function () {
  return new Promise((resolve, reject) =>
    wx.checkSession(
      {
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res);
        }

      }

    )
  )

}