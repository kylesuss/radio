import React, { Component } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { get as getUrl } from 'utils/async'
import liveInfoModels from 'constants/live-info-models'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'
import media from 'styles/media'

const REFETCH_INTERVAL = 30000 // 30 seconds

const StyledLiveInfo = styled.div`
  height: 20px;
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
  color: ${colors.BLUE_DARK};
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

const noInfoResponse = { current: { noData: true } }

class StationLiveInfo extends Component {
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
    getUrl({ url: this.liveInfoUrl })
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

    this.setState({
      liveStationInfo: normalizedResponse || noInfoResponse
    })
  }

  render () {
    const { liveStationInfo } = this.state
    const hasInactiveStatus = get(liveStationInfo, 'current.isInactive')
    const hasInactiveMessage = !!get(liveStationInfo, 'current.inactiveStatus')
    const shouldShowCurrentShowMessage = !hasInactiveStatus && get(liveStationInfo, 'current.show')
    const shouldShowNoDataMessage = (
      !this.liveInfoUrl ||
      (!hasInactiveStatus && liveStationInfo && liveStationInfo.current.noData)
    )

    return (
      <StyledLiveInfo>
        {hasInactiveStatus && (
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
              <StyledLabel hasMessage>Now Playing</StyledLabel>
            </StyledLabelContainer>

            <Value>{liveStationInfo.current.show}</Value>
          </StyledItem>
        )}

        {shouldShowNoDataMessage && (
          <StyledItem>
            <StyledLabelContainer>
              <StyledLabel>
                No live info
              </StyledLabel>
            </StyledLabelContainer>
          </StyledItem>
        )}
      </StyledLiveInfo>
    )
  }
}

export default StationLiveInfo
