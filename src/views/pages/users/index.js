import React, {useEffect, useState} from "react"
import {
    Card,
    CardBody,
    Table,
    Row,
    Col,
    Button,
    Input
} from "reactstrap"
import {useDispatch} from "react-redux"
import {setCurrentUser, setLoading} from "../../../redux/actions/loading"
import Pagination from "../../components/pagination"
import {toast} from "react-toastify"
import {useHistory, Link} from "react-router-dom/cjs/react-router-dom"
import {getAllAndFilterUser} from "../../../services/user"
import DropDownContainer from "../../components/dropDownContainer/DropDownContainer"
import defaultImage from '../../../assets/images/defualtUserImage.avif'

export default function LeadUser() {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [dataType, setDataType] = useState('h_24')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [imagePopup, setImagePopup] = useState(null)

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
            const res = await getAllAndFilterUser(page - 1, 10, objToGetData)
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
        <div style={{width: '96%', margin: 'auto', marginTop: 10}}>
            <DropDownContainer text="App Users" getDataHandler={getDataHandler}/>
            <Card style={{marginTop: 10}}>
                <CardBody>
                    <Table
                        className="table-responsive"
                        bordered
                        style={{marginTop: "20px"}}
                    >
                        <thead style={{fontSize: "13px"}}>
                        <tr>
                            <th>Full Name</th>
                            <th>Profile Img</th>
                            <th>Email</th>
                            <th>DOB</th>
                            <th>Contact</th>
                            <th>Gender</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody style={{fontSize: "13px"}}>
                        {data?.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{`${user?.first_name ?? ''} ${user?.last_name ?? ''}`}</td>
                                    <td>
                                        <img
                                            src={user?.profile_img || defaultImage}
                                            alt="User Image"
                                            style={{width: '50px', cursor: 'pointer'}}
                                            onClick={() => setImagePopup(user.profile_img)}
                                            onError={(e) => (e.target.src = '/default-user.png')}
                                        />
                                    </td>
                                    <td>{user?.email ?? '-'}</td>
                                    <td>{user?.date_of_birthday ?? '-'}</td>
                                    <td>{user?.contact ?? '-'}</td>
                                    <td>{user?.gender_type?.type ?? '-'}</td>
                                    <td>
                                        {user?.role === 'ROLE_CREATOR'
                                            ? 'Creator'
                                            : user?.role === 'ROLE_USER'
                                                ? 'User'
                                                : '-'}
                                    </td>
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
            {imagePopup && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            backgroundColor: "#fff",
                            padding: "10px",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                            maxWidth: "90%",
                            maxHeight: "90%"
                        }}
                    >
                        <button
                            onClick={() => setImagePopup(null)}
                            style={{
                                position: "absolute",
                                top: "-10px",
                                right: "-10px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            ×
                        </button>
                        <img
                            src={imagePopup}
                            alt="Popup"
                            style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "8px" }}
                        />
                    </div>
                </div>
            )}

        </div>
    )
}