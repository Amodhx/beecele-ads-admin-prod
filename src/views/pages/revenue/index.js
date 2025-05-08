import React, {useEffect, useState} from "react"
import {Card, CardBody, Table} from "reactstrap"
import {useDispatch} from "react-redux"
import {setLoading} from "../../../redux/actions/loading"
import Pagination from "../../components/pagination"
import {toast} from "react-toastify"
import {useHistory} from "react-router-dom/cjs/react-router-dom"
import "flatpickr/dist/flatpickr.css"
import DropDownContainer from "../../components/dropDownContainer/DropDownContainer"
import {getAllAndFilterRevenue} from "../../../services/revenue"

export default function Payout({ direction, ...args }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [data, setData] = useState([])
    const [dataType, setDataType] = useState('h_24')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const getDataHandler = async (page = 1, dataType, startDate, endDate) => {
        setDataType(dataType)
        setStartDate(startDate)
        setEndDate(endDate)
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
            const res = await getAllAndFilterRevenue(page - 1, 10, objToGetData)
            if (res.success) {
                setData(res.data ?? [])
                setTotalPages(res?.totalPages ?? 0)
            } else {
                setData([])
                setTotalPages(0)
                toast.error("Something went wrong")
            }
        } catch (error) {
            toast.error("Failed to fetch data")
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            getDataHandler(currentPage + 1, dataType, startDate, endDate)
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            getDataHandler(currentPage - 1, dataType, startDate, endDate)
        }
    }

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
            getDataHandler(page, dataType, startDate, endDate)
        }
    }

    return (
        <div style={{ width: '96%', margin: 'auto', marginTop: 10 }}>
            <DropDownContainer text="Revenue Stream" getDataHandler={getDataHandler}/>
            <Card style={{ marginTop: 10 }}>
                <CardBody>
                    <Table
                        className="table-responsive"
                        bordered
                        style={{ marginTop: "20px" }}
                    >
                        <thead style={{ fontSize: "13px" }}>
                            <tr>
                                <th>Date</th>
                                <th>Token Sale</th>
                                <th>Revenue</th>
                                <th>Payouts</th>
                                <th>Gross Profit</th>
                            </tr>
                        </thead>
                        <tbody style={{fontSize: "13px"}}>
                        {[...data]
                            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Descending (latest first)
                            .map((revenueData, index) => (
                                <tr key={index}>
                                    <td>{revenueData?.date ?? '-'}</td>
                                    <td>{revenueData?.tokenSale ?? '-'}</td>
                                    <td>{revenueData?.revenue ?? '-'}</td>
                                    <td>{revenueData?.payouts ?? '-'}</td>
                                    <td>{revenueData?.grossProfit ?? '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center mt-3">
                        <Pagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}