import { connect } from 'react-redux'
import Player from 'components/player'
import {
  findStationBySlug,
  findPrevStationBySlug,
  findNextStationBySlug
} from 'selectors/station'
import { togglePlayState, playStation } from 'actions/player'

const mapStateToProps = (state) => {
  const { stations, player } = state

  return {
    isOpen: state.player.isOpen,
    isPlaying: state.player.isPlaying,
    station: findStationBySlug(stations.items, player.activeStation),
    prevStation: findPrevStationBySlug(stations.items, player.activeStation),
    nextStation: findNextStationBySlug(stations.items, player.activeStation)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayState: () => dispatch(togglePlayState()),
    playStation: (args) => dispatch(playStation(args))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
