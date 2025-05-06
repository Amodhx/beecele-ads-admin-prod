import { Badge, Button, Card, CardBody, CardText, Col, Row } from "reactstrap"

function Wallet() {
  return (
    <Card>
      <CardBody>
        <Row className="pb-50">
          <Col
            sm={12}
            // sm={{ size: 6, order: 1 }}
            // xs={{ order: 2 }}
            className="d-flex justify-content-between flex-column mt-lg-0 mt-2"
          >
            <div className="session-info mb-1 mb-lg-0">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <CardText className="font-weight-bold mb-2">Wallet</CardText>
                <CardText className="font-weight-bold mb-2">
                  <Badge pill color="light-success" className="p-1">
                    {/* {moment(selectedDate).format("MMMM")} */}Jul
                  </Badge>
                </CardText>
              </div>
              <h5 className="font-medium-2">
                <small className="font-weight-normal">
                  <b>Name : </b>
                  {/* {wallet.driverName} */}
                  Test name
                </small>
                <br />
                <small className="font-weight-normal">
                  <b>Mobile : </b>
                  {/* {wallet.phone} */}
                  0777777777
                </small>
                <br />
                <small className="font-weight-normal">
                  <b>Shop : </b>
                  {/* {wallet.vehicleType} */}
                  Test Shop
                </small>
                <br />
              </h5>
              <h5 style={{ marginTop: "20px" }}>
                <p className="font-weight-normal" style={{ margin: "0" }}>
                  <b>Total Income : </b>1000
                  {/* {wallet.vehicleType} */}
                </p>
                <p className="font-weight-normal" style={{ margin: "0" }}>
                  <b>Total Orders : </b>50
                  {/* {wallet.vehicleType} */}
                </p>
                <p className="font-weight-normal" style={{ margin: "0" }}>
                  <b>Commission : </b>1000
                  {/* {wallet.vehicleType} */}
                </p>
              </h5>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default Wallet
