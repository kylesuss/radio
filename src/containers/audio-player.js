import { connect } from 'react-redux'
import AudioPlayer from 'components/audio-player'
import { setPlayerError } from 'actions/player'

const mapStateToProps = (state) => {
  return {
    playerIsPlaying: state.player.isPlaying,
    audioPlayerVolume: state.player.audioPlayerVolume
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayerError: () => dispatch(setPlayerError())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayer)
