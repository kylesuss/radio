import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { get } from 'utils/async'
import liveInfoModels from 'constants/live-info-models'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'

const REFETCH_INTERVAL = 30000 // 30 seconds

const LiveInfo = styled.div`
  margin-left: ${spacing.HALF};
  margin-bottom: ${spacing.HALF};
`

const Item = styled.div`
  display: flex;
  flex-direction: column;

  &:nth-child(n+2) {
    margin-top: ${spacing.COMMON};
  }
`

const LabelContainer = styled.div`
  display: flex;
`

const Label = styled.span`
  color: #111;
  font-family: ${fonts.SECONDARY};
  font-weight: ${fonts.WEIGHT_BOLD};
  font-style: italic;
  background: ${colors.PURE_WHITE};
  text-transform: uppercase;
  font-size: 13px;
  padding: 2px 6px;
  padding-right: 8px;
  margin-right: ${props => props.hasMessage ? '8px' : '0'};
`

const Value = styled.span`
  color: ${colors.PURE_WHITE};
  font-size: 13px;
  margin-top: ${spacing.HALF};
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
    clearInterval(this.refetchInterval)

    this.refetchInterval = setInterval(() => {
      this.getLiveInfo()
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

    return liveStationInfo ? (
      <LiveInfo>
        {shouldShowInactiveMessage && (
          <Item>
            <LabelContainer>
              <Label hasMessage={hasInactiveMessage}>
                Station currently inactive
              </Label>
            </LabelContainer>

            {hasInactiveMessage && (
              <Value>{liveStationInfo.current.inactiveStatus}</Value>
            )}
          </Item>
        )}

        {shouldShowCurrentShowMessage && (
          <Item>
            <LabelContainer>
              <Label hasMessage>Show</Label>
            </LabelContainer>

            <Value>{liveStationInfo.current.show}</Value>
          </Item>
        )}

        {shouldShowCurrentTrackMessage && (
          <Item>
            <LabelContainer>
              <Label hasMessage>Track</Label>
            </LabelContainer>

            <Value>
              {liveStationInfo.current.track}
            </Value>
          </Item>
        )}
      </LiveInfo>
    ) : null
  }
}

const mapStateToProps = (state) => ({
  playerHasError: state.player.hasError
})

export default connect(
  mapStateToProps,
  null
)(StationLiveInfo)
