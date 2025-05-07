import { lazy } from "react"

// ** Document title

// ** Default Route
const DefaultRoute = "/login"

// ** Merge Routes
export const Routes = [
  {
    path: "/dashboard",
    component: lazy(() => import("../../views/dashboard"))
  },
  {
    path: "/users",
    component: lazy(() => import("../../views/pages/users"))
  },
  {
    path: "/revenue",
    component: lazy(() => import("../../views/pages/revenue/index"))
  },
  {
    path: "/support",
    component: lazy(() => import("../../views/pages/support"))
  },
  {
    path: "/login",
    component: lazy(() => import("../../views/Login")),
    layout: "BlankLayout",
    meta: {
      authRoute: true
    }
  },
  {
    path: "/error",
    component: lazy(() => import("../../views/Error")),
    layout: "BlankLayout"
  },
  {
    path: "/logout",
    component: lazy(() => import("../../views/pages/setting/logout"))
  }
]

export default DefaultRoute
