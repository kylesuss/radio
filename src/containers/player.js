import { connect } from 'react-redux'
import Player from 'components/player'
import { findStationBySlug } from 'selectors/station'
import { togglePlayState } from 'actions/player'

const mapStateToProps = (state) => {
  return {
    isOpen: state.player.isOpen,
    isPlaying: state.player.isPlaying,
    station: findStationBySlug(state.stations.items, state.player.activeStation)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayState: () => dispatch(togglePlayState())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
