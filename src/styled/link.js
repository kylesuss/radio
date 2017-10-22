import styled from 'styled-components'
import * as colors from 'styles/colors'

const Light = styled.span`
  a&, > a {
    display: inline-block;
    color: ${colors.WHITE};
    text-decoration: none;
    border-bottom: 2px solid ${colors.BLUE};
    transition: border 250ms ease-out;

    &:hover {
      border-bottom: 2px solid ${colors.PURPLE};
    }

    &:active {
      transform: translateX(1px) translateY(1px);
    }
  }
`

export default {
  Light
}
