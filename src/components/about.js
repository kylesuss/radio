import React from 'react'
import styled from 'styled-components'
import SoundcloudIcon from 'react-icons/lib/fa/soundcloud'
import MixcloudIcon from 'react-icons/lib/fa/mixcloud'
import SectionHeader from 'styled/section-header'
import GlobeIcon from 'react-icons/lib/fa/globe'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'

const StyledAbout = styled.section`
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

const StyledDescription = styled.div`
  color: ${colors.PURE_BLACK};
  font-size: .85rem;
  line-height: 1.25rem;
  margin-bottom: ${spacing.HALF};
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

const About = ({ description, links, hasItemAbove }) => (
  <StyledAbout hasItemAbove={hasItemAbove}>
    <SectionHeader>
      About
    </SectionHeader>

    <StyledDescription>
      {description}
    </StyledDescription>

    <StyledIconsContainer>
      {links.map(link => {
        const Icon = iconMap[link.type]

        return (
          <StyledLink
            href={link.url}
            key={link.type}
            rel="noopener"
            target="_blank"
          >
            <StyledIconContainer key={link.type}>
              <Icon />
            </StyledIconContainer>

            <StyledLinkType>
              {link.type}
            </StyledLinkType>
          </StyledLink>
        )
      })}
    </StyledIconsContainer>
  </StyledAbout>
)

export default About
