import React, { useState } from "react"
import { useSkin } from "@hooks/useSkin"
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Modal
} from "reactstrap"
import logo from '../assets/images/logo/Logo.png'
import axios from "axios"
// import getRT from '../servirces/getRefreshToken'
import * as constant from "../configs/constant"
import Cookies from "cookies-js"
import { toast } from "react-toastify"
import { loginUser } from "../services/auth"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { handleLogin } from "../redux/actions/auth"
import { GoEyeClosed, GoEye } from "react-icons/go"
import { Link } from "react-router-dom/cjs/react-router-dom"

const Login = () => {
  const dispatch = useDispatch()

  const history = useHistory()
  const [skin, setSkin] = useSkin()
  const [username, setUsername] = useState("")  //admin@gmail.com
  const [password, setPassword] = useState("") //123456
  const [errorMessage, setErrorMessage] = useState("")
  const [showEyeIcon, setShowEyeIcon] = useState(false)

  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg"
  const source = require(`@src/assets/images/pages/${illustration}`).default

  const handleLoginSubmit = async () => {
    if (!username) {
      toast.error("Username cannot be empty")
    } else if (!password) {
      toast.error("Password cannot be empty")
    } else {
      // history.push("/dashboard")
      await loginUser({
        username,
        password
      }).then((res) => {
        console.log(res)
      })
      // await loginUser({
      //   username,
      //   password
      // }).then((res) => {
      //   // console.log(res)
      //   if (res.success) {
      //     if (res?.role[0] === "ROLE_ADMIN") {
      //       const userData = {
      //         id: res?.id ?? ""
      //       }
      //
      //       Cookies.set(constant.ACCESS_TOKEN, res.token)
      //       Cookies.set(constant.REFRESH_TOKEN, res.token)
      //       localStorage.setItem(constant.USER_DATA, JSON.stringify(userData))
      //       dispatch(handleLogin(userData))
      //
      //     } else {
      //       toast.error("You are not an admin. Please use correct user details")
      //     }
      //   } else if (res.status === 0) {
      //     toast.error("User data is incorrect")
      //   } else {
      //     toast.error(
      //       "Connection refused: Unable to connect to the server. Please try again later"
      //     )
      //   }
      // })
    }
  }

  const toggleEyeIcon = () => {
    setShowEyeIcon(!showEyeIcon)
  }

  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Modal
          isOpen={true}
          toggle={() => { }}
          className="modal-dialog-centered modal-sm login-form"
          fade={false}
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col lg="12" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img
                        src={logo}
                        alt={"."}
                        style={{ width: "40px", height: "40px" }}
                      />
                      <p>welcome</p>
                      <p style={{fontSize: 17, fontWeight: 'bold'}}>Sign In To Your Account</p>
                    </div>
                    <Form
                      onSubmit={(e) => e.preventDefault()}
                      className={"mt-1"}
                    >
                      {errorMessage && (
                        <div className="text-danger mb-2">{errorMessage}</div>
                      )}

                      <FormGroup>
                        <Label for="email">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="kushanmadusha@gmail.com"
                          onChange={(e) => {
                            setUsername(e.target.value)
                          }}
                        />
                      </FormGroup>

                      <FormGroup className="position-relative not-has-icon-left">
                        <Label for="email">
                          Password
                        </Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Input
                            id="password"
                            name="password"
                            style={{ paddingRight: 40 }}
                            type={showEyeIcon ? "Text" : "password"}
                            placeholder="Password"
                            onChange={(e) => {
                              setPassword(e.target.value)
                            }}
                          />
                          {
                            showEyeIcon ?
                              <GoEye size={18} style={{ position: 'absolute', right: 15 }} onClick={toggleEyeIcon} />
                              :
                              <GoEyeClosed size={18} style={{ position: 'absolute', right: 15 }} onClick={toggleEyeIcon} />
                          }
                        </div>
                        {/*<Link style={{ color: 'blue', fontSize: 12, position: 'absolute', right: 0 }}>forgot password</Link>*/}
                      </FormGroup>

                      <Button.Ripple
                        color="primary"
                        type="submit"
                        style={{ width: '100%', marginTop: 15 }}
                        onClick={handleLoginSubmit}
                      >
                        Sign In
                      </Button.Ripple>

                      {/*<Link style={{ fontSize: 12, marginTop: 2 }}>Don't have an account?</Link>*/}
                      {/*<Link style={{ color: 'blue', marginLeft: 5, fontSize: 12 }}>Register here</Link>*/}
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Modal>
      </Col>
    </Row>
  )
}

export default Login
