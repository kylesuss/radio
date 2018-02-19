import styled from 'styled-components'
import * as spacing from 'styles/spacing'

const Container = styled.div`
  display: flex;
  min-width: 792px;
  min-height: calc(100vh);
  margin: 0 ${spacing.COMMON};
`

const Content = styled.div`
  width: 100%;
  display: flex;
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
