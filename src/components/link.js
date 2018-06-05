import styled from 'styled-components'
import * as colors from 'styles/colors'

export const ExternalLink = styled.a.attrs({ target: '_blank', rel: 'nofollow' })`
  color: ${colors.BLUE_PRIMARY};
  border-bottom: 2px solid ${colors.BLUE_PRIMARY};
  text-decoration: none;
`
