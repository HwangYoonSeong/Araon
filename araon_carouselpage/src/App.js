import styled, { css } from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import ipObj from "./key";
import FileUploadComp from './components/FileUploadComp';
import CarouselComp from './components/CarouselComp';
import NavComp from './components/NavComp';

const Allview = styled.div`
  display:grid;
  grid-template-columns:  repeat(5, 1fr);
  justify-items:center;
  ${(props) => {
    return props.imgsLen >= 25 ?
      css`  align-items: center;` :
      css`  align-content: center;`
  }
  }
  position: relative;
  height:90vh;
  background-color:rgba( 0,0, 0, 0.7 );
  transition: all .3s ease-out;
  overflow:auto;
`
const Container = styled.div`
  overflow:hidden;
  position: static;
  height: 100vh;
  width: 100%;
`

const ViewImg = styled.img`
  width: auto;
  height: 15vh;
  object-fit:cover;
  margin:10px;
  padding:5px;
  cursor: pointer;
  transition: all .3s ease-out;
  :hover{
    height: 20vh;
    border: 3px solid #fab005;
  }
  ${(props) => {
    return props.idx === props.cur ?
      css`  border: 2px solid white;` :
      null
  }
  }
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

        < Allview imgsLen={showImgs.length} ref={AllViewRef} >

          {isUploaded ? (showImgs.map((el, i) => {
            return <ViewImg key={i} cur={allViewIdx - 1} idx={i} onClick={() => selectPage(i)} src={`${ipObj.server}/images/${el.image}`}></ViewImg>
          })) : null
          }

        </Allview>

      </Container >

    </div >
  );
} export default App;
