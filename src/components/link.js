import styled from 'styled-components'
import * as colors from 'styles/colors'

export const ExternalLink = styled.a.attrs({ target: '_blank', rel: 'nofollow' })`
  color: ${colors.PRIMARY_BLUE};
  border-bottom: 2px solid ${colors.PRIMARY_BLUE};
  text-decoration: none;
`
