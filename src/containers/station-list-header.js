import { connect } from 'react-redux'
import StationListHeader from 'components/station-list-header'
import { sortStations } from 'actions/stations'

const mapStateToProps = (state) => {
  return {
    sortKeyArray: state.stations.sortKeyArray
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortStations: (args) => dispatch(sortStations(args))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationListHeader)
