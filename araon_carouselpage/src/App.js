import styled, { css } from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import ipObj from "./key";

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
  const carousel = useRef();
  const AllViewRef = useRef();
  const FileUploadRef = useRef();

  const [isModal, setModal] = useState(true);
  const index = useRef(0)
  const [allViewIdx, setallViewIdx] = useState(1);
  const [isUploaded, setIsUploaded] = useState(false);
  const [brochureList, setBrochureList] = useState([]);
  const [showImgs, setShowImgs] = useState([]);
  useEffect(() => {
    axios.get(`${ipObj.server}/carousel/list`)
      .then(res => {
        // console.log(res.data[0].group);
        setBrochureList(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  const selectPage = (idx) => {
    setModal(true);
    setallViewIdx(idx + 1);
    AllViewRef.current.style.marginTop = '0';
    index.current = idx;
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;
  }

  const prev = () => {
    if (index.current === 0) return;
    index.current -= 1;
    setallViewIdx(allViewIdx - 1);
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;

  }
  const prevEnd = () => {
    index.current = 0;
    setallViewIdx(1);
    carousel.current.style.transform = `translate3d(0, 0, 0)`;

  }
  const next = () => {
    if (index.current === showImgs.length - 1) return;
    index.current += 1;
    setallViewIdx(allViewIdx + 1);
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;
  }
  const nextEnd = () => {
    index.current = showImgs.length - 1;
    setallViewIdx(showImgs.length);
    carousel.current.style.transform = `translate3d(-${90 * (showImgs.length - 1)}vw, 0, 0)`;
  }

  return (
    <div className="App" >
      <Container>
        < FileUploadComp
          brochureList={brochureList}
          FileUploadRef={FileUploadRef}
          setIsUploaded={setIsUploaded}
          setBrochureList={setBrochureList}
          setShowImgs={setShowImgs}
          prevEnd={prevEnd} />

        <CarouselComp
          isUploaded={isUploaded}
          carousel={carousel}
          showImgs={showImgs}
          prev={prev}
          next={next}
        />
        <NavComp
          prev={prev}
          next={next}
          prevEnd={prevEnd}
          nextEnd={nextEnd}
          AllViewRef={AllViewRef}
          FileUploadRef={FileUploadRef}
          allViewIdx={allViewIdx}
          showImgs={showImgs}
          isModal={isModal}
          setModal={setModal}
        />
        <AllViewComp
          showImgs={showImgs}
          AllViewRef={AllViewRef}
          allViewIdx={allViewIdx}
          isUploaded={isUploaded}
          selectPage={selectPage}
        />

      </Container >

    </div >
  );
} export default App;
