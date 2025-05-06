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

export default function LeadUser() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecodes, setTotalRecodes] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [selectedUser, setSelectedUser] = useState(null)
    const [userLoading, setUserLoading] = useState(null)
    const [search, setSearch] = useState("")

    const getDataHandler = async (page = 1) => {
        // dispatch(setLoading(true))
        // await getAllAndFilterUser(page - 1, 10, status, 'lead_user', search)
        //   .then((res) => {
        //     if (res.success) {
        //       setData(res ?? [])
        //       setTotalPages(res?.totalPages ?? 0)
        //     } else {
        //       setData([])
        //       setTotalPages(0)
        //       toast.error("somthing went wrong")
        //     }
        //   })
        //   .finally(() => {
        //     setCurrentPage(page)
        //     dispatch(setLoading(false))
        //   })
    }

    useEffect(() => {
        getDataHandler()
    }, [search])

    useEffect(() => {
    }, [data])

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

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const makeSubscriptionCategory = (minReach, maxReach) => {
        if (minReach === 50 && maxReach === 99) {
            return "Up-to 99 Views"
        } else if (minReach === 100 && 499) {
            return "100 - 499 Views"
        } else if (minReach === 500 && maxReach === 999) {
            return "500 - 999 Views"
        } else if (minReach === 1000 && maxReach === 2499) {
            return "1000 - 2499 Views"
        } else if (maxReach >= 2500) {
            return "2500+ Views"
        }
    }

    return (
        <div style={{width: '96%', margin: 'auto', marginTop: 10}}>
            <DropDownContainer text="App Users" getDataHandler={getDataHandler}/>
            <Card style={{marginTop: 10}}>
                <CardBody>
                    <Row className="d-flex align-items-center">
                        <Col md="4" style={{marginTop: 5}}>
                            <Input
                                type="text"
                                placeholder="Search By Name..."
                                value={search}
                                onChange={handleSearch}
                            />
                        </Col>
                        <Col md="4" style={{marginTop: 5}}>
                            <Input
                                type="text"
                                placeholder="Search By Email..."
                                value={search}
                                onChange={handleSearch}
                            />
                        </Col>
                    </Row>

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
                        {data?.data?.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}</td>
                                    <td>
                                        <a href={user.instagramLink} target="_blank" rel="noopener noreferrer">
                                            {user.instagramLink}
                                        </a>
                                    </td>
                                    <td>{user?.genderType?.type ?? '-'}</td>
                                    <td>{user?.age ?? '-'}</td>
                                    <td>{user?.email ?? '-'}</td>
                                    <td>{makeSubscriptionCategory(user?.subscriptionRqDTO?.subscription?.viewsAndAverage?.minReach, user?.subscriptionRqDTO?.subscription?.viewsAndAverage?.maxReach)}</td>
                                    <td>
                                        <Link to={"/lead-user"}>
                                            <Button
                                                style={{minWidth: "80px"}}
                                                color={"dark"}
                                                size="sm"
                                                onClick={() => setCurrentUser([user, data.viewAndAverage])}
                                            >
                                                View
                                            </Button>
                                        </Link>
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
        </div>
    )
}