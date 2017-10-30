import { connect } from 'react-redux'
import StationList from 'components/station-list'

const mapStateToProps = (state) => {
  return {
    stations: state.stations.items,
    activeStation: state.player.activeStation
  }
}

export default connect(
  mapStateToProps,
  null
)(StationList)
