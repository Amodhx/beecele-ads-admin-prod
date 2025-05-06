import * as constant from "../../../configs/constant"

const initialState = {
  userData: !!localStorage.getItem(constant.USER_DATA)
    ? JSON.parse(localStorage.getItem(constant.USER_DATA))
    : {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userData: action.data
      }
    case "LOGOUT":
      const obj = { ...action }
      delete obj.type
      return { ...state, userData: {}, ...obj }
    default:
      return state
  }
}

export default authReducer
