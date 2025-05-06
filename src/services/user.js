import ApiService from "./apiService"


// Todo : I have to change this func
export async function getAllAndFilterUser(page, pageSize, status, user_type, key) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `admin/user/rq/${page}/${pageSize}?status=${status}&user=${user_type}&name=${key}`
  apiObject.body = null
  apiObject.notGroup = true
  return await ApiService.callApi(apiObject)
}