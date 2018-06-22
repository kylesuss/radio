import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  LIVE_INFO_MODELS,
  LIVE_INFO_CURRENT_KEY,
  LIVE_INFO_STATUS_KEY,
  LIVE_INFO_ACTIVE_STATUS,
  LIVE_INFO_INACTIVE_STATUS,
  LIVE_INFO_NO_DATA_STATUS
} from 'constants/live-info'
import { DEFAULT_STREAM_NUMBER } from 'constants/player'
import stationPropTypes from 'prop-types/station'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'
import media from 'styles/media'
import { get as getUrl } from 'utils/async'
import cleanLiveInfo from 'utils/clean-live-info'

const REFETCH_INTERVAL = 30000 // 30 seconds

const StyledLiveInfo = styled.div`
  height: 20px;
  margin-top: calc(${spacing.HALF} + 2px);
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
  height: 20px;
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
  margin-right: 8px;
`

const StyledValue = styled.span`
  color: ${colors.BLACK};
  font-size: 13px;
  font-weight: ${fonts.WEIGHT_SEMIBOLD};
  line-height: 20px;
  max-width: 500px;
`

const NO_LIVE_INFO_MESSAGE = 'No live info'

class StationLiveInfo extends Component {
  state = {
    isLoading: false,
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
    const { station, streamNumber } = this.props

    return station.streams.find(stream => (
      stream.number === streamNumber
    )).liveInfoUrl
  }

  get modelInfoResponse () {
    const { station } = this.props
    return LIVE_INFO_MODELS[station.slug]
  }

  get labelMessage () {
    const { liveStationInfo } = this.state

    if (!this.liveInfoUrl) { return NO_LIVE_INFO_MESSAGE }

    switch (get(liveStationInfo, `${LIVE_INFO_STATUS_KEY}`)) {
      case LIVE_INFO_ACTIVE_STATUS:
        return 'Now playing'
      case LIVE_INFO_INACTIVE_STATUS:
        return 'Station currently inactive'
      case LIVE_INFO_NO_DATA_STATUS:
      default:
        return NO_LIVE_INFO_MESSAGE
    }
  }

  fetchStationData = () => {
    const { station } = this.props

    if (!this.liveInfoUrl) { return }

    this.setState({ isLoading: true }, () => {
      this.getLiveInfo(station.slug)
      this.refetchLiveInfo()
    })
  }

  getLiveInfo = (stationSlug) => {
    getUrl({ url: this.liveInfoUrl })
      .then((response) => {
        this.setState({ isLoading: false })
        this.handleInfoResponse(stationSlug, response)
      })
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

    const normalizedResponse = this.modelInfoResponse({
      text: response.text,
      body: response.body
    })

    this.setState({ liveStationInfo: cleanLiveInfo(normalizedResponse) })
  }

  render () {
    const { isLoading, liveStationInfo } = this.state

    return (
      <StyledLiveInfo>
        <StyledItem>
          {!isLoading && (
            <StyledLabelContainer>
              <StyledLabel>
                {this.labelMessage}
              </StyledLabel>
            </StyledLabelContainer>
          )}

          {liveStationInfo && (
            <StyledValue>
              {liveStationInfo[LIVE_INFO_CURRENT_KEY]}
            </StyledValue>
          )}
        </StyledItem>
      </StyledLiveInfo>
    )
  }
}

StationLiveInfo.propTypes = {
  station: stationPropTypes.isRequired,
  streamNumber: PropTypes.string
}

StationLiveInfo.defaultProps = {
  streamNumber: DEFAULT_STREAM_NUMBER
}

export {
  REFETCH_INTERVAL
}

export default StationLiveInfo
