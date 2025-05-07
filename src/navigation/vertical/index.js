import {
  BarChart,
  Settings,
  LogOut
} from "react-feather"
import { PiUsersThreeBold } from "react-icons/pi"
import { MdOutlinePayments, MdContactSupport } from "react-icons/md"

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <BarChart size={20} />,
    navLink: "/dashboard"
  },
  {
    id: "users",
    title: "Users",
    icon: <PiUsersThreeBold size={20} />,
    navLink: "/users"
  },
  {
    id: "revenue",
    title: "Revenue",
    icon: <MdOutlinePayments size={20} />,
    navLink: "/revenue"
  },
  {
    id: "support",
    title: "Support",
    icon: <MdContactSupport size={12}/>,
    navLink: "/support"
  },
  {
    id: "setting",
    title: "Settings",
    icon: <Settings size={20} />,
    children: [
      {
        id: "Logout",
        title: "Logout",
        icon: <LogOut size={12} />,
        navLink: "/logout"
      }
    ]
  }
]
