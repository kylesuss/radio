import styled from 'styled-components'
import * as positioning from 'styles/positioning'
import * as spacing from 'styles/spacing'

const Container = styled.div`
  margin-top: ${positioning.HEIGHT_HEADER};
  display: flex;
  min-width: 792px;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  padding: ${spacing.COMMON} ${spacing.DOUBLE};
  margin-top: ${spacing.DOUBLE};
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
