import React, {useEffect, useState} from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from "reactstrap"
import './styles.css'
import {getDashboardData} from '../../services/dashboard'
import {toast} from "react-toastify"
import {setLoading} from "../../redux/actions/loading"
import "flatpickr/dist/flatpickr.css"
import DropDownContainer from "../components/dropDownContainer/DropDownContainer"
import {useDispatch} from "react-redux"

export default function Dashboard({direction, ...args}) {
    const dispatch = useDispatch()
    const currentYear = new Date().getFullYear()
    const years = Array.from({length: 50}, (_, i) => currentYear - i)
    const [year, setYear] = useState(currentYear)
    const [data, setData] = useState([])
    const [userGrowData, setUserGrowData] = useState()
    const getDataHandler = async (dataType, startDate, endDate) => {
        if (dataType === "custom" && (!startDate || !endDate)) {
            return // Stop execution if startDate or endDate is missing
        }
        dispatch(setLoading(true))
        let objToGetData
        if (dataType === "custom") {
            objToGetData = {
                start: startDate,
                end: endDate,
                dateTypes: dataType
            }
        } else {
            objToGetData = {
                dateTypes: dataType
            }
        }
        try {
          const res = await getDashboardData(objToGetData)
          if (res.success) {
            setData(res?.data ?? [])
          } else {
            setData([])
            toast.error("Something went wrong")
          }
        } catch (error) {
          toast.error("Failed to fetch data")
        } finally {
          dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (data.length !== 0) {
            getDataHandler('h_24', null, null)
        }
        setUserGrowData(data?.lead_user_growth ?? [])
    }, [data])
    return (
        <div style={{width: '96%', margin: 'auto', marginTop: 10}}>
            <div>
                <DropDownContainer text="Overview" getDataHandler={getDataHandler}/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
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
                                {data?.length ?? 0}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}