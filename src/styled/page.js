import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'

const ListPage = styled.div`
  display: flex;
  min-width: 792px;
  margin-right: 1.5rem;
`

const ListPageDetails = styled.div`
  position: relative;
  flex: 1;
`

const ListPageScrollable = styled.div`
  position: absolute;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
  overflow: auto;
`

const ListHeader = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
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
  ListPage,
  ListPageDetails,
  ListPageScrollable,
  ListHeader,
  ListHeaderText
}
