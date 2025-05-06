import React from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { Spinner } from "reactstrap"

function GlobalSpinner() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading.loading)

  return (
    <div className={`global-spinner ${loading ? "visible" : "hidden"}`}>
      <Spinner color="primary" />
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.loading.loading
})

export default connect(mapStateToProps)(GlobalSpinner)
