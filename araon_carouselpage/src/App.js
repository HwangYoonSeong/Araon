import styled from 'styled-components';
import React from 'react';

import { Provider } from './Context';
import FileUploadComp from './components/FileUploadComp';
import CarouselComp from './components/CarouselComp';
import NavComp from './components/NavComp';
import AllViewComp from './components/AllViewComp';

const Container = styled.div`
  overflow:hidden;
  position: static;
  height: 100vh;
  width: 100%;
`
function App () {
  return (
    <Provider >
      <Container>
        <FileUploadComp />
        <CarouselComp />
        <NavComp />
        <AllViewComp />

      </Container >

    </Provider >
  );
} export default App;
