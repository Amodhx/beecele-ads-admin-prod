import axios from "axios"
import apiConfig from "./apiConfig"
import * as constant from "../configs/constant"
import Cookies from "js-cookie"
import swal from "sweetalert"

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

instance.interceptors.request.use(
    (config) => {
        const excludedPaths = ['auth/signin', 'auth/refresh-token']
        const shouldExclude = excludedPaths.some(path => config.url?.includes(path))

        if (!shouldExclude) {
            const token = Cookies.get(constant.ACCESS_TOKEN)
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

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
    response => response,
    async error => {
        const originalRequest = error.config
        const status = error.response ? error.response.status : 0

        if (originalRequest.url?.includes("auth/signin")) {
            return Promise.reject(error)
        }

        if (status === 401 && !originalRequest._retry) {
            if (isRefresh) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`
                    return instance(originalRequest)
                })
            }

            originalRequest._retry = true
            isRefresh = true

            const refreshToken = Cookies.get(constant.REFRESH_TOKEN)

            try {
                const URL = `${apiConfig.serverUrl}/${apiConfig.basePath}/auth/refresh-token`
                const response = await instance.post(URL, { refreshToken })

                const newAccessToken = response.data?.idToken
                const newRefreshToken = response.data?.refreshToken

                Cookies.set(constant.ACCESS_TOKEN, newAccessToken)
                Cookies.set(constant.REFRESH_TOKEN, newRefreshToken)

                processQueue(null, newAccessToken)
                isRefresh = false

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                return instance(originalRequest)

            } catch (err) {
                processQueue(err, null)
                alertToCantRefreshToken()
                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)


export default instance
