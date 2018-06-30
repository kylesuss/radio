import React from 'react'
import styled from 'styled-components'
import stationPropTypes from 'prop-types/station'
import { ExternalLink } from 'styled/link'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'

const StyledStationDetails = styled.div`
  font-size: 13px;
  line-height: 18px;
`

const StyledStationDetailsRow = styled.div`
  display: flex;
  padding-top: ${spacing.HALF};
  padding-bottom: ${props => props.withLink ? `calc(${spacing.HALF} + 3px)` : spacing.HALF};
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`

const StyledLabel = styled.div`
  color: ${colors.BLACK};
  font-family: ${fonts.SECONDARY};
  font-weight: ${fonts.WEIGHT_BOLD};
  font-style: italic;
  text-transform: uppercase;
  margin-right: ${spacing.HALF};
  width: 60px;
  padding-top: 1px;
`

const StyledValue = styled.div`
  color: ${colors.BLUE_GREY};
  flex: 1;

  > *:nth-child(n + 2) {
    margin-top: 12px;
  }
`

const StationDetails = ({ station }) => (
  <StyledStationDetails>
    {station.description && (
      <StyledStationDetailsRow>
        <StyledLabel>
          About
        </StyledLabel>

        <StyledValue>
          {station.description}
        </StyledValue>
      </StyledStationDetailsRow>
    )}

    {station.twitterHandle && (
      <StyledStationDetailsRow withLink>
        <StyledLabel>
          Twitter
        </StyledLabel>

        <StyledValue>
          <ExternalLink href={`https://twitter.com/${station.twitterHandle}`}>
            @{station.twitterHandle}
          </ExternalLink>
        </StyledValue>
      </StyledStationDetailsRow>
    )}

    {station.archives && (
      <StyledStationDetailsRow withLink>
        <StyledLabel>
          Archives
        </StyledLabel>

        <StyledValue>
          {station.archives.map(archive => (
            <div key={archive.display}>
              <ExternalLink href={archive.url}>
                {archive.display}
              </ExternalLink>
            </div>
          ))}
        </StyledValue>
      </StyledStationDetailsRow>
    )}

    {station.web && (
      <StyledStationDetailsRow withLink>
        <StyledLabel>
          Web
        </StyledLabel>

        <StyledValue>
          <ExternalLink href={station.web.url}>
            {station.web.display}
          </ExternalLink>
        </StyledValue>
      </StyledStationDetailsRow>
    )}
  </StyledStationDetails>
)

StationDetails.propTypes = {
  station: stationPropTypes
}

export default StationDetails
