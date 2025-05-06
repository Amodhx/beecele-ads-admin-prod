import {useEffect, useState} from "react"
import '../dropDownContainer/styles.css'
import {Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from "reactstrap"
import Flatpickr from "react-flatpickr"

export default function DropDownContainer({text, getDataHandler}) {

    const currentYear = new Date().getFullYear()
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)
    const toggleUser = () => setUserDropdownOpen((prevState) => !prevState)
    const [year, setYear] = useState(currentYear)
    const [dateType, setDateType] = useState("h_24")
    const [startDate, setFromDate] = useState()
    const [endDate, setToDate] = useState()

    useEffect(() => {
        getDataHandler(dateType, startDate, endDate)
    }, [dateType, startDate, endDate, year])

    const makeDate = (selectedDate) => {
        const date = new Date(selectedDate)
        // Format the date component
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0') // Month (0-indexed)
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')


        // Get milliseconds and timezone offset
        const milliseconds = String(date.getMilliseconds()).padEnd(9, '0') // Pad to 9 digits
        const timezoneOffset = date.getTimezoneOffset()
        const offsetHours = String(Math.abs(timezoneOffset / 60)).padStart(2, '0')
        const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, '0')
        const timezone = timezoneOffset < 0 ? `+${offsetHours}:${offsetMinutes}` : `-${offsetHours}:${offsetMinutes}`

        // Append timezone region manually
        const region = "[Asia/Colombo]"

        // Construct the final output
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${`+05:30`}${region}`
    }
    return (
        <>
            <h3>{text}</h3>
            <Row className='dropdown-contaioner'>
                <Col md="2">
                    <div>
                        <Dropdown isOpen={userDropdownOpen} toggle={toggleUser}>
                            <DropdownToggle caret color="dark">
                                {dateType === "h_24"
                                    ? "In 24 Hours"
                                    : dateType === "day_7"
                                        ? "In 7 Days"
                                        : dateType === "month"
                                            ? "In Month"
                                            : "Custom"}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => setDateType("h_24")}>In 24 hours</DropdownItem>
                                <DropdownItem onClick={() => setDateType("day_7")}>In 7 days</DropdownItem>
                                <DropdownItem onClick={() => setDateType("month")}>In Month</DropdownItem>
                                <DropdownItem onClick={() => setDateType("custom")}>Custom</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
                {dateType === "custom" &&
                    <Col md="10">
                        <div style={{display: 'flex'}}>
                            <Flatpickr
                                value={startDate}
                                placeholder="From Date"
                                className="form-control"
                                style={{marginRight: 5}}
                                onChange={(date) => setFromDate(makeDate(date))}
                            />
                            <Flatpickr
                                value={endDate}
                                placeholder="To Date"
                                className="form-control"
                                style={{marginRight: 5}}
                                onChange={(date) => setToDate(makeDate(date))}
                            />
                        </div>
                    </Col>
                }
            </Row>
        </>
    )
}