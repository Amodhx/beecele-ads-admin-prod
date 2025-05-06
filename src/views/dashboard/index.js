import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap"
import Chart from '../components/chart/Chart'
import './styles.css'
import { getDashboardData } from '../../services/dashboard'
import { toast } from "react-toastify"
import { setLoading } from "../../redux/actions/loading"
import "flatpickr/dist/flatpickr.css"
import DropDownContainer from "../components/dropDownContainer/DropDownContainer"

export default function Dashboard({ direction, ...args }) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)
  const [year, setYear] = useState(currentYear)
  const [data, setData] = useState()
  const [userGrowData, setUserGrowData] = useState()
  useEffect(() => {
    setUserGrowData(data?.lead_user_growth ?? [])
  }, [data])

  const getDataHandler = async () => {
    // if (dateType === "custom" && (!startDate || !endDate)) {
    //   return // Stop execution if startDate or endDate is missing
    // }
    // dispatch(setLoading(true))
    //
    // const requestData = {
    //   dateTypes: dateType,
    //   year: year.toString(), // Ensuring it's a string
    //   ...(dateType === "custom" && { start: startDate, end: endDate }) // Conditional property spread
    // }
    //
    // // console.log("Fetching data with:", requestData) // Debugging log
    //
    // try {
    //   const res = await getDashboardData(requestData)
    //   if (res.success) {
    //     setData(res?.data ?? [])
    //   } else {
    //     setData([])
    //     toast.error("Something went wrong")
    //   }
    // } catch (error) {
    //   // console.error("Error fetching data:", error)
    //   toast.error("Failed to fetch data")
    // } finally {
    //   dispatch(setLoading(false))
    // }
  }
  return (
    <div style={{ width: '96%', margin: 'auto', marginTop: 10 }}>
      <div>
        <DropDownContainer text = "Overview" getDataHandler = {getDataHandler} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Card
            className="my-2"
            color="info"
            inverse
            style={{
              width: '18rem'
            }}
          >
            <CardBody>
              <CardTitle tag="h5">
                Users Count
              </CardTitle>
              <CardText>
                {data?.active_lead_user_by_selection ?? 0}
              </CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}