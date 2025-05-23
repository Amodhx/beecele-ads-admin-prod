import ApiService from "./apiService"

export async function getAllAndFilterUser(page, pageSize, obj) {
    const apiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = true
    apiObject.endpoint = `admin/users/details/${page}/${pageSize}`
    apiObject.body = obj
    apiObject.notGroup = true
    return await ApiService.callApi(apiObject)
}