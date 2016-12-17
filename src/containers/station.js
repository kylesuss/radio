import { connect } from 'react-redux'
import Station from 'pages/station'
import { findStationBySlug } from 'selectors/station'

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.params

  return {
    station: findStationBySlug(state.stations, slug)
  }
}

export default connect(
  mapStateToProps,
  null
)(Station)
