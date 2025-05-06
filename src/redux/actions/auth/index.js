
export const handleLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN",
      data
    })
  }
}
