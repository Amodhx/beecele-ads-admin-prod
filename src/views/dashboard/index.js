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
    const [dataType, setDataType] = useState('h_24')
    const [data, setData] = useState()
    const getDataHandler = async (page = 1, dataType, startDate, endDate) => {
        setDataType(dataType)
        console.log(dataType)
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
                setData(res?.data?.sign_up_user_count ?? 0)
            } else {
                setData(0)
                toast.error("Something went wrong")
            }
        } catch (error) {
            toast.error("Failed to fetch data")
        } finally {
            dispatch(setLoading(false))
        }
    }
    const getDataLabel = () => {
        switch (dataType) {
            case 'h_24':
                return 'past 24 hours'
            case 'day_7':
                return 'past week'
            case 'custom':
                return 'selected dates'
            default:
                return ''
        }
    }

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
                                {data === 0 ? `No users in ${getDataLabel()}` : data}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}