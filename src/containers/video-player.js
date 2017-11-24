import { connect } from 'react-redux'
import VideoPlayer from 'components/video-player'
import { muteAudioPlayer, unmuteAudioPlayer } from 'actions/player'
import { toggleVideoAudioState } from 'actions/video'

const mapStateToProps = (state) => {
  return {
    hasActiveAudio: state.video.hasActiveAudio,
    playerIsPlaying: state.player.isPlaying
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    muteAudioPlayer: () => dispatch(muteAudioPlayer()),
    unmuteAudioPlayer: () => dispatch(unmuteAudioPlayer()),
    toggleVideoAudioState: () => dispatch(toggleVideoAudioState())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer)
