exports.show = function () {
  wx.showLoading({
    title: "",
    mask: true
  });
}

exports.hide = function () {
  wx.hideLoading()
}