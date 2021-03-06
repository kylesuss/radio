import styled from 'styled-components'
import * as spacing from 'styles/spacing'
import media from 'styles/media'

const Content = styled.div`
  width: 100%;
  margin-top: ${spacing.DOUBLE};
  padding: ${spacing.COMMON} ${spacing.HALF};
  ${media.smallScreenUp`
    padding: ${spacing.COMMON} ${spacing.COMMON};
  `}
  ${media.mediumScreenUp`
    padding: ${spacing.COMMON} ${spacing.DOUBLE};
  `}
  ${media.largeScreenUp`
    display: flex;
  `}
`

const Column = styled.div`
  flex: 1;
  margin-bottom: ${spacing.COMMON};
  ${media.largeScreenUp`
    margin-left: ${spacing.DOUBLE};
  `}

  &:first-child {
    margin-left: 0;
  }
`

export default {
  Content,
  Column
}
