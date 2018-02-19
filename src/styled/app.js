import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'

const Container = styled.div`
  background: ${colors.BLACK};
  margin-top: 0;
  min-height: calc(100vh);
`

const Main = styled.main`
  margin-left: ${positioning.WIDTH_LEFT_COLUMN_PX};
`

export default {
  Container,
  Main
}
