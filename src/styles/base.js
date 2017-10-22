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
    background: ${colors.BLACK};
    font-family: ${fonts.PRIMARY};
    -webkit-font-smoothing: subpixel-antialiased;
  }

  a {
    cursor: pointer;
  }

  .btn-reset {
    padding: 0;
    border: 0;
    outline: none;
    background: transparent;
    cursor: pointer;

    &:disabled {
      cursor: default;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
`

export default base
