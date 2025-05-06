import { useState } from "react"
import "./chart.css"
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis
} from "recharts"

export default function Chart({ bookingData }) {

  const transformedData = bookingData?.map(([month, date, count]) => ({
    month,  // First element as month name
    count   // Third element as booking count
  }))

  return (
    <div style={{ width: '100%', height: 400, marginTop: '70px', marginBottom: '30px' }}>
      {
        transformedData &&
        <ResponsiveContainer>
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      }
    </div>
  )
}
