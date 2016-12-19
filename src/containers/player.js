import { connect } from 'react-redux'
import Player from 'components/player'

const mapStateToProps = (state) => {
  return {
    isOpen: state.player.isOpen,
    isPlaying: state.player.isPlaying
  }
}

export default connect(
  mapStateToProps,
  null
)(Player)
