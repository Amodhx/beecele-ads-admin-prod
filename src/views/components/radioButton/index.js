import React, { useState } from 'react'

export default function RadioButton({ status, title, selectedStatus, setSelectedStatus, disabled }) {
    return (
        <div className="d-flex align-items-center">
            <input
                type="radio"
                value={status}
                checked={selectedStatus === status}
                onChange={() => setSelectedStatus(status)}
                disabled={!disabled}
            />
            <label
                style={{ margin: "0", marginLeft: "5px", marginRight: "20px" }}
            >
                {title}
            </label>
        </div>
    )
}
