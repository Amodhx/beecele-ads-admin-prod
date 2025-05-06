/* eslint-disable multiline-ternary */
import toastr from "toastr"
import Cookies from "js-cookie"
import * as constant from "../configs/constant"

export const notifyMessage = (msg, title, type, duration, place = null) => {
  let msgType = "error"
  if (type === 0) {
    msgType = "error"
  } else if (type === 1) {
    msgType = "success"
  } else if (type === 2) {
    msgType = "warning"
  }
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: place ? `toast-top-${place}` : "toast-top-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "2500",
    hideDuration: "2500",
    timeOut: duration ? duration : "2500",
    extendedTimeOut: "2500",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  }
  toastr[msgType](
    // eslint-disable-next-line multiline-ternary
    msg === undefined || msg === null
      ? // eslint-disable-next-line multiline-ternary
        type === 0
        ? // eslint-disable-next-line multiline-ternary
          "Error"
        : "Success"
      : msg,
    // eslint-disable-next-line multiline-ternary
    title
      ? title
      : type === 0
      ? "Error"
      : type === 1
      ? "Success"
      : type === 2
      ? "Warning"
      : "Error"
  )
}

export const isAuth = () => {
  return (
    !!localStorage.getItem(constant.USER_DATA) &&
    !!Cookies.get(constant.ACCESS_TOKEN) &&
    !!Cookies.get(constant.REFRESH_TOKEN)
  )
}
