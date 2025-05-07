import React, { useState } from "react"
import { Input, Button, Label } from "reactstrap"
import {toast} from "react-toastify"

export default function Support() {
    const [email, setEmail] = useState("")

    const handleReset = () => {
        if (!email) {
            toast.error("Email cannot be empty")
        } else {

        }
    }

    return (
        <div style={{ width: '96%', margin: 'auto', marginTop: 20 }}>
            <h3>Merchant Tools</h3>

            <div
                style={{
                    marginTop: 20,
                    padding: 20,
                    backgroundColor: "#f8f9fa",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    maxWidth: 500
                }}
            >
                <h5 style={{ marginBottom: 20 }}>Reset Merchant Stripe Account</h5>

                <Label for="merchantEmail" style={{ fontWeight: 500 }}>Merchant Email</Label>
                <Input
                    id="merchantEmail"
                    type="email"
                    placeholder="Enter merchant email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: 15 }}
                />

                <Button color="primary" onClick={handleReset}>
                    Reset
                </Button>
            </div>
        </div>
    )
}
