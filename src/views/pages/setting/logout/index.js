import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setLoading} from "../../../../redux/actions/loading"
import {handleLogin} from "../../../../redux/actions/auth"
import Cookies from "js-cookie"
import * as constant from "../../../../configs/constant"
import {useHistory} from "react-router-dom/cjs/react-router-dom.min"

function LogOut() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(handleLogin({}))
        Cookies.remove(constant.ACCESS_TOKEN)
        Cookies.remove(constant.REFRESH_TOKEN)
        localStorage.removeItem(constant.USER_DATA)
        dispatch(setLoading(false))

        history.push(`${constant.BASE_ROUTE_PATH}/login`)
    }, [])

    return <div></div>
}

export default LogOut
