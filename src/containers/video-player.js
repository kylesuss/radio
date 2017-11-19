import { connect } from 'react-redux'
import VideoPlayer from 'components/video-player'
import { videoWillLoad, videoDidStart, videoDidEnd } from 'actions/video'

const mapStateToProps = (state) => {
  return {
    playerIsPlaying: state.player.isPlaying
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    videoWillLoad: () => dispatch(videoWillLoad()),
    videoDidStart: () => dispatch(videoDidStart()),
    videoDidEnd: () => dispatch(videoDidEnd())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer)
