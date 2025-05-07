import ApiService from "./apiService"

export async function resetMerchantStripeAccount(email) {
    const apiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = true
    apiObject.endpoint = `admin/remove/stripe/connect/${email}`
    apiObject.notGroup = true
    return await ApiService.callApi(apiObject)
}