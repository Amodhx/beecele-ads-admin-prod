import axios from "axios"
import apiConfig from "./apiConfig"
import * as constant from "../configs/constant"
import Cookies from "js-cookie"
import swal from "sweetalert"
import {string} from "yup"

const instance = axios.create({
    timeout: 5000
})
let isRefresh = false


let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (token) {
            prom.resolve(token)
        } else {
            prom.reject(error)
        }
    })
    failedQueue = []
}

function alertToCantRefreshToken() {
    swal({
        title: "Session expired. Please login again",
        closeOnClickOutside: false,
        buttons: {
            dangerMode: {
                text: "Okay",
                value: "action",
                className: "okay-btn"
            }
        }
    }).then((value) => {
        switch (value) {
            case "action":
                /*eslint-disable */
                Cookies.remove(constant.ACCESS_TOKEN)
                Cookies.remove(constant.REFRESH_TOKEN)
                localStorage.removeItem(constant.USER_DATA)
                window.location = `${constant.BASE_ROUTE_PATH}/login`
                /*eslint-enable */
                break
            default:
        }
    })
}


instance.interceptors.response.use(
    async (response) => response,
    async (error) => {
        const originalRequest = error.config
        const status = error.response ? error.response.status : 0
        if (originalRequest.url?.includes('auth/signin')) {
            return
        }
        if (status !== 200 && !originalRequest._retry) {
            if (isRefresh) {
                return new Promise < string >((resolve, reject) => {
                    failedQueue.push({resolve, reject})
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`
                        return instance(originalRequest)
                    })
            }
        }
        originalRequest._retry = true
        isRefresh = true

        const refreshToken = Cookies.get(constant.REFRESH_TOKEN)

        try {
            const URL = `${apiConfig.serverUrl}/${apiConfig.basePath}/auth/refreshToken`
            let isAccessTokenRefreshed = false
            const response = await instance.post(URL, {}, config)
                .then(async (response) => {
                    await Cookies.set(constant.ACCESS_TOKEN, response.data?.idToken)
                    await Cookies.set(constant.REFRESH_TOKEN, response.data?.refreshToken)
                    isAccessTokenRefreshed = true
                    processQueue(null, response.data?.idToken)
                    isRefresh = false

                    originalRequest.headers['Authorization'] = `Bearer ${Cookies.get(constant.REFRESH_TOKEN)}`
                    return instance(originalRequest)
                })
                .catch((error) => {
                    alertToCantRefreshToken()
                })
        } catch (error) {
            alertToCantRefreshToken()
        }
    }
)

export default instance
