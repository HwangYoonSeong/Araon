import styled, { css } from 'styled-components';
import React, { useRef, useState } from 'react';

import pizz from './assets/Fizz.jpg';
import pZed from './assets/Proj_Zed.jpg';
import akali from './assets/akali.jpg';
import sZed from './assets/Zed.jpg';
import yasuo from './assets/Yasuo.jpg';
import Zedgif from './assets/Zedgif.webp';

import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

import {
  MdFirstPage, MdChevronLeft, MdChevronRight,
  MdLastPage, MdApps, MdInfoOutline, MdClear
} from 'react-icons/md'

const Allview = styled.div`
  display:flex;
  justify-content:space-around;
  align-content: space-evenly;
  flex-wrap: wrap;
  position: relative;
  top:100%;
  margin-top:-100vh;
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
  padding:5px;
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

 background-color: #212529;
 height:10vh;
 z-index:2;

`
const NavBtn = styled.button`
  background-color:transparent;
  border:0;
  cursor: pointer;
  color:#adb5bd;
  ${(props) => {
    return props.info ?
      css` font-size:30px;` :
      css` font-size:40px;`
  }
  }

  :hover{
    color:white;
  }
    
`

function App () {
  // const contents = [1, 2, 3, 4];
  const carousel = useRef();
  const modal = useRef();
  const [isModal, setModal] = useState(true);
  const index = useRef(0)

  const selectPage = (idx) => {
    console.log(idx);
    setModal(true);
    modal.current.style.top = '100%';
    index.current = idx;
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;
  }

  const prev = () => {
    if (index.current === 0) return;
    index.current -= 1;
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;

  }
  const prevEnd = () => {
    index.current = 0;
    carousel.current.style.transform = `translate3d(0, 0, 0)`;

  }
  const next = () => {
    if (index.current === 5) return;
    index.current += 1;
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;
  }
  const nextEnd = () => {
    index.current = 5;
    carousel.current.style.transform = `translate3d(-450vw, 0, 0)`;
  }

  const allView = () => {
    setModal(false);
    modal.current.style.top = 0;
  }
  const closeAllView = () => {
    setModal(true);
    modal.current.style.top = '100%';
  }

  return (
    <div className="App" >
      <Container>
        <CarouselContainer>
          <ArrowBtn onClick={prev}> <IoIosArrowBack /></ArrowBtn>
          <Wrapper>
            <Carousel ref={carousel}>
              {/* {
            contents.map((el, idx) => {
              return (
                <Content key={idx} color={idx} ></Content>
              )
            })
          } */}
              <Content> <Img src={pizz}></Img></Content>
              <Content> <Img src={sZed}></Img></Content>
              <Content> <Img src={akali}></Img></Content>
              <Content><Img src={pZed}></Img></Content>
              <Content><Img src={yasuo}></Img></Content>
              <Content><Img src={Zedgif}></Img></Content>
            </Carousel>
          </Wrapper>

          <ArrowBtn onClick={next}><IoIosArrowForward /></ArrowBtn>
        </CarouselContainer >

        <Nav>
          {isModal ? (<NavBtn onClick={allView}> <MdApps />  </NavBtn>) : (<NavBtn onClick={closeAllView}> <MdClear />  </NavBtn>)}
          <div style={{ display: 'flex' }}>
            <NavBtn onClick={prevEnd}> <MdFirstPage /></NavBtn>
            <NavBtn onClick={prev}> <MdChevronLeft /></NavBtn>
            <NavBtn onClick={next}><MdChevronRight /></NavBtn>
            <NavBtn onClick={nextEnd}><MdLastPage /></NavBtn>
          </div>
          <NavBtn info={true} onClick={nextEnd}><MdInfoOutline /></NavBtn>
        </Nav>
        < Allview ref={modal} >
          <ViewImg onClick={() => selectPage(0)} src={pizz}></ViewImg>
          <ViewImg onClick={() => selectPage(1)} src={sZed}></ViewImg>
          <ViewImg onClick={() => selectPage(2)} src={akali}></ViewImg>
          <ViewImg onClick={() => selectPage(3)} src={pZed}></ViewImg>
          <ViewImg onClick={() => selectPage(4)} src={yasuo}></ViewImg>
          <ViewImg onClick={() => selectPage(5)} src={Zedgif}></ViewImg>
        </Allview>

      </Container >

    </div >
  );
} export default App;
