import { connect } from 'react-redux'
import AudioPlayer from 'components/audio-player'

const mapStateToProps = (state) => {
  return {
    playerIsPlaying: state.player.isPlaying,
    audioPlayerVolume: state.player.audioPlayerVolume
  }
}

export default connect(
  mapStateToProps,
  null
)(AudioPlayer)
