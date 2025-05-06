import ApiService from './apiService'

export async function loginUser(userCredentials) {
    const apiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = false
    apiObject.endpoint = "auth/signin"
    apiObject.body = userCredentials
    apiObject.type = "AUTH"
    return await ApiService.callApi(apiObject)
}