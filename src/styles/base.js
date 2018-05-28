import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'

const base = `
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background: ${colors.WHITE};
    font-family: ${fonts.PRIMARY};
    -webkit-font-smoothing: subpixel-antialiased;
  }

  a {
    cursor: pointer;
  }
`

export default base
