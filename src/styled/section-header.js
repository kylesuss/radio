import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'

const SectionHeader = styled.div`
  color: ${colors.PURE_BLACK};
  margin-bottom: ${spacing.COMMON};
  text-transform: uppercase;
  padding-bottom: ${spacing.HALF};
  border-bottom: 2px solid ${colors.BORDER};
`

export default SectionHeader
