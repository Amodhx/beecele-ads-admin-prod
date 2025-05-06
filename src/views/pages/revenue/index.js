import React, {useEffect, useState} from "react"
import {Button, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Table} from "reactstrap"
import {useDispatch} from "react-redux"
import {setLoading} from "../../../redux/actions/loading"
import Pagination from "../../components/pagination"
import {toast} from "react-toastify"
import {useHistory} from "react-router-dom/cjs/react-router-dom"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/flatpickr.css"
import DropDownContainer from "../../components/dropDownContainer/DropDownContainer"

export default function Payout({ direction, ...args }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecodes, setTotalRecodes] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [selectedUser, setSelectedUser] = useState(null)
    const [userLoading, setUserLoading] = useState(null)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("pending")
    const [start, setFromDate] = useState()
    const [end, setToDate] = useState()
    const [userId, setUserId] = useState()
    const [type, setType] = useState("all")

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => setDropdownOpen((prevState) => !prevState)

    const getDataHandler = async (page = 1) => {
        // // if (start && end) {
        // dispatch(setLoading(true))
        // await getAllPayouts(page - 1, 10, { date: start, type })
        //     .then((res) => {
        //         if (res.success) {
        //             setData(res ?? [])
        //             setTotalPages(res?.totalPages ?? 0)
        //             // } else if (res.result) {
        //             //     setData([])
        //             //     setTotalPages(0)
        //             //     toast.error("Please enter valid date range")
        //         } else {
        //             setData([])
        //             setTotalPages(0)
        //             toast.error("Something went wrong")
        //         }
        //     })
        //     .finally(() => {
        //         setCurrentPage(page)
        //         dispatch(setLoading(false))
        //     })
    }

    useEffect(() => {
        getDataHandler()
    }, [start, type])

    const handleNext = () => {
        if (currentPage < totalPages) {
            getDataHandler(currentPage + 1)
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            getDataHandler(currentPage - 1)
        }
    }

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            getDataHandler(page)
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
                        <tbody style={{ fontSize: "13px" }}>
                            {data?.data?.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user?.userId ?? '-'}</td>
                                        <td>{user?.totalUserAmount ? `${user?.totalUserAmount} ${user.userCurrency}` : '-'}</td>
                                        <td>{user?.totalUserAmount ? `${user?.totalUserAmount} ${user.userCurrency}` : '-'}</td>
                                        <td>{user?.totalUserAmount ? `${user?.totalUserAmount} ${user.userCurrency}` : '-'}</td>
                                        <td>{user?.totalUserAmount ? `${user?.totalUserAmount} ${user.userCurrency}` : '-'}</td>
                                    </tr>
                                )
                            })
                            }
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