import moment from "moment"
import "./widgetLg.css"
import { User } from "react-feather"
import { Badge } from "reactstrap"

export default function WidgetLg({ transactions }) {
  const Button = ({ type }) => {
    return <button className={`widgetLgButton ${type}`}>{type}</button>
  }
  return (
    <div className="widgetLg" style={{ marginTop: '30px' }}>
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Transaction Id</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Merchant Name</th>
            <th className="widgetLgTh">requested Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((transaction, index) => (
              <tr className="widgetLgTr" key={index}>
                <td className="widgetLgUser">
                  <span>{transaction.paymentTransactionId ?? "-"}</span>
                </td>
                <td className="widgetLgDate">{moment(transaction.createDate).format("YYYY MMMM DD") ?? "-"}</td>
                <td className="widgetLgName">{transaction.merchantLegalName ?? "-"}</td>
                <td className="widgetLgAmount">{transaction.requestedAmount ?? "-"}</td>
                <Badge color={!transaction.isProcessed ? "warning" : "success"} style={{ marginBottom: 5, width: '80px' }}>
                  {!transaction.isProcessed ? "Pending" : "Approved"}
                </Badge>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
