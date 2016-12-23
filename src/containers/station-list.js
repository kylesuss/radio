import { connect } from 'react-redux'
import StationList from 'components/station-list'

const mapStateToProps = (state) => {
  return {
    stations: state.stations.items
  }
}

export default connect(
  mapStateToProps,
  null
)(StationList)
