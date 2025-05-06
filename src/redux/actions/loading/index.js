
// const [current_User, set_Current_user] = useState()

let current_user

export const setLoading = (loading) => ({
  type: "SET_LOADING",
  payload: loading
})

export const getCurrentUser = () => {
  return current_user
}

export const setCurrentUser = (user) => {
  // console.log(user)
  current_user = user
}