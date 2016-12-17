import { connect } from 'react-redux'
import Home from 'pages/home'
import { push } from 'react-router-redux'

const mapStateToProps = (state) => {
  return {
    stations: state.stations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (args) => dispatch(push(args))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
