import React from 'react'
import StyledPage from 'styled/page'
import styled from 'styled-components'

const StyledEmptyDetails = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`

const Home = () => (
  <StyledPage.ListPageDetails>
    <StyledEmptyDetails />
  </StyledPage.ListPageDetails>
)

export default Home
