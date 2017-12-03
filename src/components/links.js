import React from 'react'
import styled from 'styled-components'
import SoundcloudIcon from 'react-icons/lib/fa/soundcloud'
import MixcloudIcon from 'react-icons/lib/fa/mixcloud'
import SectionHeader from 'styled/section-header'
import GlobeIcon from 'react-icons/lib/fa/globe'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'

const StyledLinks = styled.section`
  margin-top: ${props => props.hasItemAbove ? spacing.DOUBLE : spacing.COMMON};
`

const StyledIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledIconContainer = styled.div`
  color: ${colors.BORDER};
  font-size: 24px;
`

const StyledLinkType = styled.span`
  color: ${colors.PURPLE};
  margin-left: 8px;
  font-size: .85rem;
`

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`

const iconMap = {
  'Mixcloud': MixcloudIcon,
  'SoundCloud': SoundcloudIcon,
  'Web': GlobeIcon
}

const Links = ({ items, hasItemAbove }) => (
  <StyledLinks hasItemAbove={hasItemAbove}>
    <SectionHeader>
      Links
    </SectionHeader>

    <StyledIconsContainer>
      {items.map(item => {
        const Icon = iconMap[item.type]
        return (
          <StyledLink
            href={item.url}
            target="_blank"
            rel="noopener"
          >
            <StyledIconContainer key={item.type}>
              <Icon />
            </StyledIconContainer>

            <StyledLinkType>
              {item.type}
            </StyledLinkType>
          </StyledLink>
        )
      })}
    </StyledIconsContainer>
  </StyledLinks>
)

export default Links
