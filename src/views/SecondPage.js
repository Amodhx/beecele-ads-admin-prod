import React from 'react'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'

const SecondPage = () => {
    return (
        <Card className="text-center" style={{ marginTop: '20px' }}>
            <CardBody>
                <CardTitle tag="h5" className="mb-3">
                    No Data Available 🙁
                </CardTitle>
                <CardText>
                    Currently, there are no users available in the selected time period.
                </CardText>
                <CardText>
                    Please try adjusting the filters or try again later.
                </CardText>
            </CardBody>
        </Card>
    )
}

export default SecondPage
