import { ZAxis } from "recharts"
import "./widgetSm.css"
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap"
import { useState } from "react"
import UserDetail from "../../dashboard/lastFiveUsers"
import { IoPersonOutline } from "react-icons/io5"

export default function WidgetSm({ users }) {
  const [showModal, setShowModal] = useState(false)
  const [selecteduser, setSelectedUser] = useState()

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user, index) => (
          <li className="widgetSmListItem" key={index}>
            {user.profilePic ?
              <img
                src={user.profilePic}
                alt=""
                className="widgetSmImg"
              />
              :
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray', borderRadius: '100%' }}>
                <IoPersonOutline size={25} color="#FFFFFF" />
              </div>
            }

            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.userName ?? '-'}</span>
              {/* <span className="widgetSmUserTitle">{user.role ?? "-"}</span> */}
            </div>

            <Button
              style={{ minWidth: "80px" }}
              color={"warning"}
              size="sm"
              onClick={() => { setSelectedUser(user); toggleModal() }}
            >
              View
            </Button>

          </li>
        ))}
      </ul>
      <Modal
        size={"lg"}
        isOpen={showModal}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>
          Last Five Users
        </ModalHeader>
        <ModalBody>
          <UserDetail user={selecteduser} />
        </ModalBody>
      </Modal>
    </div>
  )
}
