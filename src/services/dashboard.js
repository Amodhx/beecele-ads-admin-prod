import ApiService from "./apiService"

export async function getDashboardData(obj) {
    const apiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = true
    apiObject.endpoint = `admin/users`
    apiObject.body = obj
    return await ApiService.callApi(apiObject)
}