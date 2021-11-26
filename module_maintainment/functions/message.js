export default function message(title, ...params) {
  wx.showToast({
    title: title,
    icon: params.icon || "none",
    image: params.image || "",
    duration: params.duration || 1500,
    mask: params.duration || false,
    success: typeof params.success == "function" && params.success,
    fail: typeof params.fail == "function" && params.fail,
    complete: typeof params.complete == "function" && params.complete
  });
}