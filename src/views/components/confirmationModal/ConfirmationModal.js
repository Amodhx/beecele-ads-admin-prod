import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Label } from "reactstrap"
import styles from '../../pages/leaduser.css'
import { useEffect, useState } from "react"

export default function ConfirmationModal({ confirmationModal, toggle, yes, setRejectReason }) {
    // const [selectedReason, setSelectedReason] = useState([])
    const [selectedReason, setSelectedReason] = useState([])
    const [rejectReasons, setReasons] = useState([])

    const reasons = [
        "Not a public profile",
        "Fewer than 500 followers",
        "Fewer than 50 story views",
        "No active engagement"
    ]

    const handleClick = (index) => {
        setSelectedReason((prevReasons) => {
            if (prevReasons.includes(index)) {
                return prevReasons.filter((r) => r !== index) // Remove if exists
            } else {
                return [...prevReasons, index] // Add to selectedReason if not exists
            }
        })
        // First remove from rejectReasons if exists
        setReasons((prevRejectReasons) => {
            const reasonToRemove = reasons[index] // Get the reason to remove
            if (prevRejectReasons.includes(reasonToRemove)) {
                // Remove the reason if it exists
                return prevRejectReasons.filter((r) => r !== reasonToRemove)
            } else {
                // Add the reason if it doesn't exist
                return [...prevRejectReasons, reasonToRemove]
            }
        })
    }

    useEffect(() => {
        setRejectReason(rejectReasons)
    }, [rejectReasons])


    return (
        <Modal isOpen={confirmationModal} toggle={() => toggle(confirmationModal)}>
            <ModalHeader toggle={() => toggle(confirmationModal)}>Are you sure you want to reject?</ModalHeader>
            <ModalBody>
                <Label>Reason for rejection</Label>
                <div>
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="reject-reason"
                            style={{
                                backgroundColor: selectedReason.includes(index) ? "#313848" : "white"
                            }}
                            onClick={() => handleClick(index)}
                        >
                            <span className="reason-text" style={{ marginLeft: "5px" }}>
                                {reason}
                            </span>
                        </div>
                    ))}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="success" disabled={selectedReason.length === 0} onClick={() => { toggle(confirmationModal); yes() }}>
                    Yes
                </Button>{' '}
                <Button color="dark" onClick={() => toggle(confirmationModal)}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    )
}