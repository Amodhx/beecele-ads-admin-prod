import React, { useState } from "react"
import { Input, Button, Label } from "reactstrap"
import {toast} from "react-toastify"
import {resetMerchantStripeAccount} from "../../../services/support"
import {setLoading} from "../../../redux/actions/loading"
import {useDispatch} from "react-redux"

export default function Support() {
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()

    const handleReset = async () => {
        if (!email) {
            toast.error("Email cannot be empty")
        } else {
            dispatch(setLoading(true))
            try {
                const res = await resetMerchantStripeAccount(email)
                if (res.success) {
                    toast.success("Successfully removed account")
                } else {
                    toast.error("Something went wrong")
                }
            } catch (error) {
                toast.error("Failed to fetch data")
            } finally {
                dispatch(setLoading(false))
            }
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
