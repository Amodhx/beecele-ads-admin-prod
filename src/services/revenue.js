//Todo : Create Revenue api calls

import ApiService from "./apiService"

export async function getAllAndFilterRevenue(page, pageSize, obj) {
    const apiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = true
    apiObject.endpoint = `admin/tokens/${page}/${pageSize}`
    apiObject.body = obj
    apiObject.notGroup = true
    return await ApiService.callApi(apiObject)
}