import "./featuredInfo.css"

export default function FeaturedInfo({ cardData }) {

  const values = {}
  cardData.forEach(([key, value]) => {
    values[key] = value
  })

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">User Count</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{values.userCount ?? '-'}</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Shop Count</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{values.shopCount ?? '-'}</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Last Seven Day Booking Count</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{values.lastSevenDayBookingCount ?? '-'}</span>
        </div>
      </div>
    </div>
  )
}
