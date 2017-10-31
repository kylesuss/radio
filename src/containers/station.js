import { connect } from 'react-redux'
import Station from 'pages/station'
import { playStation } from 'actions/player'
import { findStationBySlug } from 'selectors/station'

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.params

  return {
    station: findStationBySlug(state.stations.items, slug),
    activeStation: state.player.activeStation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    playStation: (args) => dispatch(playStation(args))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Station)
