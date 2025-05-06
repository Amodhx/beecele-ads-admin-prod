import { Badge } from "reactstrap"
import styles from "../../pages/leaduser.css"
import { useState } from "react"

export default function UserInfo({ tittle}) {

  return (
    <Badge className='static-badge' pill>
      {tittle}
    </Badge>
  )
}
