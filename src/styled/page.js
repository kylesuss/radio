import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'
import * as positioning from 'styles/positioning'
import * as shadow from 'styles/shadow'

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - ${positioning.HEIGHT_HEADER});
  background: ${colors.WHITE};
  padding: ${spacing.COMMON};
  box-shadow: ${shadow.SETTINGS_COMMON} ${colors.SHADOW};
`

const Column = styled.div`
  width: 50%;
`

const ListPage = styled.div`
  display: flex;
  min-width: 792px;
  margin: 0 ${spacing.COMMON};
`

const ListPageDetails = styled.div`
  position: relative;
  flex: 1;
`

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background: ${colors.BLACK};
  padding: 0 1.5rem;
  box-shadow: 0px 0px 15px -4px rgba(0,0,0,.8);
  z-index: 1;
`

const ListHeaderText = styled.div`
  flex-grow: 1;
  font-family: ${fonts.PRIMARY};
  text-transform: uppercase;
  color: ${colors.WHITE};
`

export default {
  Container,
  Column,
  ListPage,
  ListPageDetails,
  ListHeader,
  ListHeaderText
}
