import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ExternalLink } from 'components/link'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'

const StyledStationDetails = styled.div`
  font-size: 13px;
  line-height: 16px;
`

const StyledStationDetailsRow = styled.div`
  display: flex;
  padding-top: ${spacing.HALF};
  padding-bottom: ${spacing.HALF};
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`

const StyledLabel = styled.div`
  color: ${colors.BLACK};
  font-family: ${fonts.SECONDARY};
  font-weight: 500;
  font-style: italic;
  text-transform: uppercase;
  margin-right: ${spacing.HALF};
  width: 50px;
`

const StyledValue = styled.div`
  color: ${colors.BLUE_GREY};
  flex: 1;
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

    {station.web && (
      <StyledStationDetailsRow>
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
  station: PropTypes.shape({
    description: PropTypes.string,
  }).isRequired,
}

export default StationDetails
