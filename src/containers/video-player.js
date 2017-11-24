import { connect } from 'react-redux'
import VideoPlayer from 'components/video-player'
import { muteAudioPlayer, unmuteAudioPlayer } from 'actions/player'

const mapStateToProps = (state) => {
  return {
    playerIsPlaying: state.player.isPlaying
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    muteAudioPlayer: () => dispatch(muteAudioPlayer()),
    unmuteAudioPlayer: () => dispatch(unmuteAudioPlayer())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer)
