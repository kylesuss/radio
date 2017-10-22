import styled from 'styled-components'

const Button = styled.button`
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
`

export default Button
