import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { get } from 'utils/async'
import liveInfoModels from 'constants/live-info-models'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'
import media from 'styles/media'

const REFETCH_INTERVAL = 30000 // 30 seconds

const StyledLiveInfo = styled.div`
  display: none;
  height: 46px;
  margin-top: ${spacing.HALF};
`

const StyledItem = styled.div`
  ${media.mediumScreenUp`
    display: flex;
  `}

  &:nth-child(n + 2) {
    margin-top: 6px
  }
`

const StyledLabelContainer = styled.div`
  display: flex;
  margin-bottom: 4px;
  ${media.mediumScreenUp`
    margin-bottom: 0;
  `}
`

const StyledLabel = styled.span`
  display: flex;
  align-items: center;
  color: ${colors.DARK_BLUE};
  font-family: ${fonts.SECONDARY};
  font-weight: ${fonts.WEIGHT_BOLD};
  font-style: italic;
  background: ${colors.LABELS};
  text-transform: uppercase;
  font-size: 13px;
  padding: 2px 6px;
  margin-right: ${props => props.hasMessage ? '8px' : '0'};
`

const Value = styled.span`
  color: ${colors.BLACK};
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
`

class StationLiveInfo extends Component {
  static propTypes = {
    playerHasError: PropTypes.bool.isRequired
  }

  state = {
    liveStationInfo: null
  }

  componentDidMount () {
    this.fetchStationData()
  }

  componentWillReceiveProps (nextProps) {
    const { station } = this.props

    if (station.slug !== nextProps.station.slug) {
      this.setState({ liveStationInfo: null })
    }
  }

  componentDidUpdate (prevProps) {
    const { station } = this.props

    if (station.slug !== prevProps.station.slug) {
      this.fetchStationData()
    }
  }

  componentWillUnmount () {
    clearInterval(this.refetchInterval)
    this.refetchInterval = null
  }

  get liveInfoUrl () {
    const { station } = this.props
    return station.liveInfoUrl
  }

  fetchStationData = () => {
    const { station } = this.props
    if (!this.liveInfoUrl) { return }
    this.getLiveInfo(station.slug)
    this.refetchLiveInfo()
  }

  getLiveInfo = (stationSlug) => {
    get({ url: this.liveInfoUrl })
      .then((response) => this.handleInfoResponse(stationSlug, response))
  }

  refetchLiveInfo = () => {
    const { station } = this.props

    clearInterval(this.refetchInterval)

    this.refetchInterval = setInterval(() => {
      this.getLiveInfo(station.slug)
    }, REFETCH_INTERVAL)
  }

  handleInfoResponse = (stationSlug, response) => {
    const { station } = this.props

    if (stationSlug !== station.slug) { return }

    const normalizedResponse = liveInfoModels[station.slug]({
      text: response.text,
      body: response.body
    })

    this.setState({ liveStationInfo: normalizedResponse })
  }

  render () {
    const { playerHasError } = this.props
    const { liveStationInfo } = this.state
    const hasInactiveStatus = liveStationInfo && liveStationInfo.current.isInactive
    const hasInactiveMessage = liveStationInfo && !!liveStationInfo.current.inactiveStatus
    const shouldShowInactiveMessage = playerHasError || hasInactiveStatus
    const shouldShowCurrentShowMessage = !shouldShowInactiveMessage && liveStationInfo && liveStationInfo.current.show
    const shouldShowCurrentTrackMessage = !shouldShowInactiveMessage && liveStationInfo && liveStationInfo.current.track

    if (!liveStationInfo) { return <StyledLiveInfo /> }

    return (
      <StyledLiveInfo>
        {shouldShowInactiveMessage && (
          <StyledItem>
            <StyledLabelContainer>
              <StyledLabel hasMessage={hasInactiveMessage}>
                Station currently inactive
              </StyledLabel>
            </StyledLabelContainer>

            {hasInactiveMessage && (
              <Value>{liveStationInfo.current.inactiveStatus}</Value>
            )}
          </StyledItem>
        )}

        {shouldShowCurrentShowMessage && (
          <StyledItem>
            <StyledLabelContainer>
              <StyledLabel hasMessage>Show</StyledLabel>
            </StyledLabelContainer>

            <Value>{liveStationInfo.current.show}</Value>
          </StyledItem>
        )}

        {shouldShowCurrentTrackMessage && (
          <StyledItem>
            <StyledLabelContainer>
              <StyledLabel hasMessage>Track</StyledLabel>
            </StyledLabelContainer>

            <Value>
              {liveStationInfo.current.track}
            </Value>
          </StyledItem>
        )}
      </StyledLiveInfo>
    )
  }
}

const mapStateToProps = (state) => ({
  playerHasError: state.player.hasError
})

export default connect(
  mapStateToProps,
  null
)(StationLiveInfo)
