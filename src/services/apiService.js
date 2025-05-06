import axios from "./axiosConfig"
import apiConfig from "./apiConfig"
import Cookies from "js-cookie"
import * as constant from "../configs/constant"
import * as commonFunc from "../utility/commonFunc"

async function callApi(apiObject) {
  let body = {}
  const method = apiObject.method ? apiObject.method.toLowerCase() : "get"

  if (method === "post" || method === "put" || method === "patch") {
    body = apiObject.body ? apiObject.body : {}
  }

  /*eslint-disable */
  const headers = {
    "Content-Type": apiObject.urlencoded
      ? "application/x-www-form-urlencoded"
      : apiObject.multipart
        ? "multipart/form-data"
        : "application/json",
    Channel: "ADMIN"
  }
  /*eslint-enable */

  if (apiObject.authentication) {
    headers.Authorization = `Bearer ${Cookies.get(constant.ACCESS_TOKEN)}`
  }

  const serverUrl = apiConfig.serverUrl
  let basePath  = apiConfig.basePath
  console.log(basePath)
  if (apiObject.basePath) {
    basePath = apiObject.basePath
  }

  const url = `${serverUrl}/${basePath}/${apiObject.endpoint}`
  console.log(url)
  let result

  await axios[method](
    url,
    /*eslint-disable */
    method !== "get" && method !== "delete" ? body : { headers: headers },
    { headers: headers }
  )
    .then(async (response) => {
      const responseData = await response.data
      if (responseData.code === "500")
        throw { response: { ...responseData, status: 500 } }
      result = {
        ...responseData,
        success: true
      }
    })
    /*eslint-enable */
    .catch(async (error) => {
      if (error !== undefined) {
        if (error.response === undefined) {
          result = {
            success: false,
            status: 2,
            result: "Your connection was interrupted",
            data: null
          }
        } else if (error.response.status === 500) {
          result = {
            success: false,
            status: 2,
            result: error?.response?.data?.desc || error?.response?.result,
            data: null
          }
        } else if (error.response.status === 401) {
          if (apiObject.type !== "AUTH") {
            /*eslint-disable */
            Cookies.remove(constant.ACCESS_TOKEN)
            localStorage.removeItem(constant.USER_DATA)
            commonFunc.notifyMessage(
              "Your session expired! Please login again..",
              "Session expired",
              0
            )
            window.location = `${constant.BASE_ROUTE_PATH}/login`
          }
          result = {
            success: false,
            status: 2,
            result: "Your session expired! Please login again..",
            data: null
          }
        } else if (error.response.status === 403) {
          result = {
            success: false,
            status: 2,
            result: "Access is denied.",
            data: null
          }
        } else if (error.response.status === 417) {
          result = {
            success: false,
            status: 2,
            result: "Oops! Something went wrong.",
            data: null
          }
        } else if (error.response.data !== undefined) {
          result = {
            success: false,
            status: 0,
            result: error.response.data.result
                ? error.response.data.result
                : "Sorry, something went wrong",
            data: null
          }
        } else {
          result = {
            success: false,
            status: 2,
            result: "Sorry, something went wrong.",
            data: null
          }
        }
      } else {
        result = {
          success: false,
          status: 2,
          result: "Your connection was interrupted!",
          data: null
        }
      }
    })
  /*eslint-enable */
  return result
}

export default { callApi }
