import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'
import * as positioning from 'styles/positioning'
import * as shadow from 'styles/shadow'

const Container = styled.div`
  display: flex;
  min-width: 792px;
  min-height: calc(100vh - ${positioning.HEIGHT_HEADER_PX});
  background: ${colors.WHITE};
  margin: 0 ${spacing.COMMON};
  box-shadow: ${shadow.SETTINGS_COMMON} ${colors.SHADOW};
`

const Content = styled.div`
  width: 100%;
  padding: ${spacing.COMMON} 1.7rem;
  display: flex;
`

const Column = styled.div`
  flex: 1;
  margin-left: 1.7rem;

  &:first-child {
    margin-left: 0;
  }
`

export default {
  Container,
  Content,
  Column
}
