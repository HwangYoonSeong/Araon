import styled, { css } from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import axios from 'axios';
import ipObj from "./key";
import {
  MdFirstPage, MdChevronLeft, MdChevronRight,
  MdLastPage, MdApps, MdClear, MdMenu
} from 'react-icons/md'

import FileUploadComp from './components/FileUploadComp';

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

const CarouselContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  background-color: #343a40;
  height:90vh;
`

const Carousel = styled.div`
`
const Wrapper = styled.div`
width: 90vw; 
height: 90vh;
overflow: hidden;
background-color:black;
 &>${Carousel}{
  display: inline-flex;
  transform: translate3d(0, 0, 0); 
  transition: transform 0.4s;
 }   
`
const Content = styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color:black;
width: 90vw; 
height: 90vh;

`
const Img = styled.img`
  width: auto;
  height: 90vh;
  object-fit:cover;
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
const ArrowBtn = styled.button`
  background-color:transparent;
  border:0;
  cursor: pointer;
  color:#adb5bd;
  font-size:60px;

  :hover{
    color:white;
  }
    
`
const Nav = styled.div`
 position:relative;
 display:grid;
 grid-template-columns: 1fr 2fr 1fr;
 justify-content:space-around;
 align-items:center;
 background-color: #212529;
 height:10vh;
 z-index:2;

`


const AllViewNum = styled.div`
  font-size:20px;
  margin:10px 0 0 10px;
 
`
const NavBtn = styled.button`
  display:flex;
  justify-content:center;
  background-color:transparent;
  border:0;
  cursor: pointer;
          color:#adb5bd;
          :hover{
            color:white;
            &>${AllViewNum}{
              color:#adb5bd;
            }   
          }
  ${(props) => {
    return props.info ?
      css` font-size:30px;` :
      css` font-size:40px;`
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

  const allView = () => {
    setModal(false);
    AllViewRef.current.style.marginTop = '-100vh';
  }

  const closeAllView = () => {
    setModal(true);
    AllViewRef.current.style.marginTop = '0';
  }

  const home = () => {
    FileUploadRef.current.style.bottom = '-100%';
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

        <CarouselContainer>
          <ArrowBtn onClick={prev}> <IoIosArrowBack /></ArrowBtn>
          <Wrapper >
            <Carousel ref={carousel}>
              {isUploaded ? (showImgs.map((el, i) => {
                return <Content key={i}> <Img src={`${ipObj.server}/images/${el.image}`}></Img></Content>
              })) : null
              }
            </Carousel>
          </Wrapper>

          <ArrowBtn onClick={next}><IoIosArrowForward /></ArrowBtn>
        </CarouselContainer >

        <Nav>
          {isModal ? (
            <NavBtn onClick={allView}>
              <MdApps />
              <AllViewNum><span style={{ color: 'white' }}>{allViewIdx}</span> / {showImgs.length}</AllViewNum>
            </NavBtn>) :
            (
              <NavBtn isAllView={true} onClick={closeAllView}>
                <MdClear />
                <AllViewNum><span style={{ color: 'white' }}>{allViewIdx}</span> / {showImgs.length}</AllViewNum>
              </NavBtn>)}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NavBtn onClick={prevEnd}> <MdFirstPage /></NavBtn>
            <NavBtn onClick={prev}> <MdChevronLeft /></NavBtn>
            <NavBtn onClick={next}><MdChevronRight /></NavBtn>
            <NavBtn onClick={nextEnd}><MdLastPage /></NavBtn>
          </div>

          <NavBtn info={true} onClick={home}><MdMenu /></NavBtn>
        </Nav>

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
