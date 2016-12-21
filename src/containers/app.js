import { connect } from 'react-redux'
import App from 'components/app'

const mapStateToProps = (state) => {
  return {
    playerIsOpen: state.player.isOpen
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
