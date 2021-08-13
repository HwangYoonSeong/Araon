import styled, { css } from 'styled-components';
import React, { useRef, useState } from 'react';

import pizz from './assets/Fizz.jpg';
import pZed from './assets/Proj_Zed.jpg';
import akali from './assets/akali.jpg';
import sZed from './assets/Zed.jpg';
import yasuo from './assets/Yasuo.jpg';
import Zedgif from './assets/Zedgif.webp';
import Darius_15 from './assets/Darius_15.jpg';
import Fizz_8 from './assets/Fizz_8.jpg';
import Nocturne_7 from './assets/Nocturne_7.jpg';
import Varus_9 from './assets/Varus_9.jpg';

import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import axios from 'axios';

import {
  MdFirstPage, MdChevronLeft, MdChevronRight,
  MdLastPage, MdApps, MdInfoOutline, MdClear,
} from 'react-icons/md'

const Allview = styled.div`
  display:flex;
  justify-content:space-around;
  align-content: center;
  flex-wrap: wrap;
  position: relative;
  height:100vh;
  background-color:rgba( 0,0, 0, 0.7 );
  transition: all .3s ease-out;
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
// const Content = styled.div`
//   display:flex;
//   width:500px;
//   height:300px;
//   justify-content:center;
//   align-items:center;

//   ${(props) => {
//     switch (props.color) {
//       case 0:
//         return css`
//          background-color:#74c0fc;
//          `
//       case 1:
//         return css`
//          background-color:#8ce99a;
//          `
//       case 2:
//         return css`
//          background-color:#ffe066;
//          `
//       default:
//         return css`
//          background-color:#c0eb75;
//          `

//     }
//   }

//   }

// `
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
  height: 20vh;
  object-fit:cover;
  margin:10px;
  padding:5px;
  cursor: pointer;
  transition: all .3s ease-out;
  :hover{
    height: 25vh;
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
 display:flex;
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
  /* ${(props) => {
    return props.isModal || props.isAllView ?
      css`
          cursor: pointer;
          color:#adb5bd;
          :hover{
            color:white;
            &>${AllViewNum}{
              color:#adb5bd;
            }   
          }
        ` :
      css` 
          color:#495057;
          cursor: not-allowed;
          pointer-events: none;
        `
  }

  } */
  ${(props) => {
    return props.info ?
      css` font-size:30px;` :
      css` font-size:40px;`
  }
  }
    
`
const FileUploadView = styled.div`
 display:flex;
 flex-direction:column;
 justify-content:center;
 align-items: center;
 height:100vh;
 background-color:rgba( 0,0, 0, 0.7 );
 position: relative;
 margin-top:-100vh;
 bottom:-100%;
 transition: all .3s ease-out;
 z-index:3;
`
const FileUploadContainer = styled.div`
display:flex;
margin-top:20px;
`
const FileUpload = styled.input`
  color:white;
`
const FileUploadBtn = styled.button`
`

const Title = styled.div`
  color:white;
  font-size:50px;
`
function App () {
  // const contents = [1, 2, 3, 4];
  const carousel = useRef();
  const AllViewRef = useRef();
  const FileUploadRef = useRef();
  const [isModal, setModal] = useState(true);
  const index = useRef(0)
  const [allViewIdx, setallViewIdx] = useState(1);
  const [imgs, setImages] = useState([]);

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
    if (index.current === 9) return;
    index.current += 1;
    setallViewIdx(allViewIdx + 1);
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;
  }
  const nextEnd = () => {
    index.current = 9;
    setallViewIdx(10);
    carousel.current.style.transform = `translate3d(-810vw, 0, 0)`;
  }

  const allView = () => {
    setModal(false);
    AllViewRef.current.style.marginTop = '-100vh';
  }
  const closeAllView = () => {
    setModal(true);
    AllViewRef.current.style.marginTop = '0';
  }

  const FileOnChange = (e) => {
    setImages(e.target.files);
  }

  const upload = () => {
    FileUploadRef.current.style.bottom = '0';

    const formData = new FormData();
    imgs.forEach((el) => {
      formData.append('Images[]', el);
    })

    // 서버의 upload API 호출
    axios.post("/api/upload", formData);

  }
  return (
    <div className="App" >
      <Container>
        < FileUploadView ref={FileUploadRef}   >
          <Title>Araon Carousel Page</Title>
          <FileUploadContainer>
            <FileUpload type="file" multiple="multiple" name="filename[]" onChange={FileOnChange} />
            <FileUploadBtn onClick={upload}>Upload</FileUploadBtn>
          </FileUploadContainer>

        </FileUploadView>
        <CarouselContainer>
          <ArrowBtn onClick={prev}> <IoIosArrowBack /></ArrowBtn>
          <Wrapper >
            <Carousel ref={carousel}>
              <Content> <Img src={pizz}></Img></Content>
              <Content> <Img src={sZed}></Img></Content>
              <Content> <Img src={akali}></Img></Content>
              <Content> <Img src={pZed}></Img></Content>
              <Content> <Img src={yasuo}></Img></Content>
              <Content> <Img src={Zedgif}></Img></Content>
              <Content> <Img src={Darius_15}></Img></Content>
              <Content> <Img src={Fizz_8}></Img></Content>
              <Content> <Img src={Nocturne_7}></Img></Content>
              <Content> <Img src={Varus_9}></Img></Content>
            </Carousel>
          </Wrapper>

          <ArrowBtn onClick={next}><IoIosArrowForward /></ArrowBtn>
        </CarouselContainer >

        <Nav>
          {isModal ? (
            <NavBtn isModal={isModal} onClick={allView}>
              <MdApps />
              <AllViewNum><span style={{ color: 'white' }}>{allViewIdx}</span> / 10</AllViewNum>
            </NavBtn>) :
            (
              <NavBtn isModal={isModal} isAllView={true} onClick={closeAllView}>
                <MdClear />
                <AllViewNum><span style={{ color: 'white' }}>{allViewIdx}</span> / 10</AllViewNum>
              </NavBtn>)}
          <div style={{ display: 'flex' }}>
            <NavBtn isModal={isModal} onClick={prevEnd}> <MdFirstPage /></NavBtn>
            <NavBtn isModal={isModal} onClick={prev}> <MdChevronLeft /></NavBtn>
            <NavBtn isModal={isModal} onClick={next}><MdChevronRight /></NavBtn>
            <NavBtn isModal={isModal} onClick={nextEnd}><MdLastPage /></NavBtn>
          </div>

          <NavBtn isModal={isModal} info={true} onClick={nextEnd}><MdInfoOutline /></NavBtn>
        </Nav>

        < Allview ref={AllViewRef} >
          <ViewImg cur={allViewIdx - 1} idx={0} onClick={() => selectPage(0)} src={pizz}></ViewImg>
          <ViewImg cur={allViewIdx - 1} idx={1} onClick={() => selectPage(1)} src={sZed}></ViewImg>
          <ViewImg cur={allViewIdx - 1} idx={2} onClick={() => selectPage(2)} src={akali}></ViewImg>
          <ViewImg cur={allViewIdx - 1} idx={3} onClick={() => selectPage(3)} src={pZed}></ViewImg>
          <ViewImg cur={allViewIdx - 1} idx={4} onClick={() => selectPage(4)} src={yasuo}></ViewImg>
          <ViewImg cur={allViewIdx - 1} idx={5} onClick={() => selectPage(5)} src={Zedgif}></ViewImg>
          <ViewImg cur={allViewIdx - 1} idx={6} onClick={() => selectPage(6)} src={Darius_15}></ViewImg>
          <ViewImg cur={allViewIdx - 1} idx={7} onClick={() => selectPage(7)} src={Fizz_8}></ViewImg>
          <ViewImg cur={allViewIdx - 1} idx={8} onClick={() => selectPage(8)} src={Nocturne_7}></ViewImg>
          <ViewImg cur={allViewIdx - 1} idx={9} onClick={() => selectPage(9)} src={Varus_9}></ViewImg>
        </Allview>

      </Container >

    </div >
  );
} export default App;
