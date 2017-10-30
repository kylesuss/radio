import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'
import * as transitions from 'styles/transitions'
import * as shadow from 'styles/shadow'

const Container = styled.div`
  background: ${colors.LIGHT_GREY};
  margin-top: ${positioning.HEIGHT_HEADER};
  min-height: calc(100vh - ${positioning.HEIGHT_HEADER});
`

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${positioning.HEIGHT_HEADER};
  background: linear-gradient(to right, ${colors.GREEN}, ${colors.BLUE}, ${colors.GREEN}, ${colors.BLUE}, ${colors.GREEN}, ${colors.BLUE});
  z-index: ${positioning.Z_INDEX_APP_HEADER};
`

const LeftColumn = styled.div`
  position: fixed;
  top: ${positioning.HEIGHT_HEADER};
  left: 0;
  bottom: 0;
  width: ${positioning.WIDTH_LEFT_COLUMN_PX};
  box-shadow: ${shadow.SETTINGS_COMMON} ${props => props.isShowingTwitterPreview ? 'transparent' : colors.SHADOW};
  transition: box-shadow ${props => props.isShowingTwitterPreview ? '0ms' : transitions.LENGTH_COMMON_MS} ease-out ${props => props.isShowingTwitterPreview ? '0ms' : transitions.LENGTH_COMMON_MS};
  z-index: ${positioning.Z_INDEX_APP_LEFT_COLUMN};
`

const Main = styled.main`
  position: fixed;
  top: ${positioning.HEIGHT_HEADER};
  right: 0;
  bottom: 0;
  left: 0;
  margin-left: ${positioning.WIDTH_LEFT_COLUMN_PX};
  overflow-y: auto;
`

export default {
  Container,
  Header,
  LeftColumn,
  Main
}
