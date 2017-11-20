import { connect } from 'react-redux'
import AudioPlayer from 'components/audio-player'

const mapStateToProps = (state) => {
  return {
    playerIsPlaying: state.player.isPlaying,
    isPlayingVideo: state.video.isPlaying
  }
}

export default connect(
  mapStateToProps,
  null
)(AudioPlayer)
