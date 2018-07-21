import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { togglePlayState } from 'actions/player'
import { DEFAULT_STREAM_NUMBER } from 'constants/player'
import { buildStationPath } from 'constants/routes'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import media from 'styles/media'
import * as spacing from 'styles/spacing'
import * as transitions from 'styles/transitions'

const StyledStreamsTabs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${colors.LABELS};
  padding-left: ${spacing.HALF};
  ${media.smallScreenUp`
    padding-left: ${spacing.COMMON};
  `}
  ${media.mediumScreenUp`
    padding-left: ${spacing.DOUBLE};
  `}
`

const StyledStreamTab = styled(({
  isActiveStream, ...rest
}) => <Link {...rest} />)`
  text-decoration: none;
  font-family: ${fonts.SECONDARY};
  font-weight: ${props => props.isActiveStream ? fonts.WEIGHT_BOLD : fonts.NORMAL};
  font-style: italic;
  text-transform: uppercase;
  font-size: 13px;
  padding: ${spacing.HALF} 1px ${spacing.HALF} 4px;
  margin-bottom: -1px;
  color: ${props => props.isActiveStream ? colors.BLACK : colors.BLUE_GREY};
  border-bottom: 2px solid ${props => props.isActiveStream ? colors.BLACK : 'transparent'};
  transition: border ${transitions.LENGTH_COMMON_MS} ease-out;

  &:hover {
    ${props => !props.isActiveStream && `
      border-bottom: 2px solid ${colors.BLUE_PRIMARY};
    `}
  }

  &:nth-child(n + 2) {
    margin-left: ${spacing.COMMON};
  }
`

const StreamsTabs = ({
  playerIsPlaying,
  router,
  stationSlug,
  streams,
  streamNumber,
  togglePlayState
}) => (
  <StyledStreamsTabs>
    {streams.map((stream) => {
      const isActiveStream = stream.number === streamNumber
      const navigateToStream = () => {
        if (playerIsPlaying) { return }
        togglePlayState()
      }

      return (
        <StyledStreamTab
          to={buildStationPath(stationSlug, stream.number)}
          key={`stream--${stream.number}`}
          isActiveStream={isActiveStream}
          onClick={navigateToStream}
          disabled={isActiveStream}
        >
          Stream {stream.number}
        </StyledStreamTab>
      )
    })}
  </StyledStreamsTabs>
)

StreamsTabs.propTypes = {
  playerIsPlaying: PropTypes.bool.isRequired,
  stationSlug: PropTypes.string.isRequired,
  streams: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string.isRequired
  })),
  streamNumber: PropTypes.string,
  togglePlayState: PropTypes.func.isRequired
}

StreamsTabs.defaultProps = {
  streamNumber: DEFAULT_STREAM_NUMBER
}

const mapStateToProps = (state) => ({
  playerIsPlaying: state.player.isPlaying
})

const mapDispatchToProps = (dispatch) => ({
  togglePlayState: () => dispatch(togglePlayState())
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(StreamsTabs)
