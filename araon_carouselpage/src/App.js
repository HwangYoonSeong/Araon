import styled from 'styled-components';
import React, { useRef } from 'react';

import pizz from './assets/pizz.jpg';
import pZed from './assets/Proj_Zed.jpg';
import akali from './assets/akali.jpg';
import sZed from './assets/Zed.png';

import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

import { MdFirstPage, MdChevronLeft, MdChevronRight, MdLastPage } from 'react-icons/md'


const Container = styled.div`
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
 display:flex;
 justify-content:center;
 background-color: #212529;
 width:100%;
 height:10vh;

`

const NavBtn = styled.button`
  background-color:transparent;
  border:0;
  cursor: pointer;
  color:#adb5bd;
  font-size:40px;

  :hover{
    color:white;
  }
    
`
function App () {
  // const contents = [1, 2, 3, 4];
  const carousel = useRef();
  let index = 0;
  const prev = () => {
    if (index === 0) return;
    index -= 1;
    carousel.current.style.transform = `translate3d(-${90 * index}vw, 0, 0)`;

  }
  const prevEnd = () => {
    index = 0
    carousel.current.style.transform = `translate3d(0, 0, 0)`;

  }

  const next = () => {
    if (index === 3) return;
    index += 1;
    carousel.current.style.transform = `translate3d(-${90 * index}vw, 0, 0)`;
  }
  const nextEnd = () => {
    index = 3
    carousel.current.style.transform = `translate3d(-270vw, 0, 0)`;
  }
  return (
    <div className="App">
      <Container>
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

          </Carousel>
        </Wrapper>

        <ArrowBtn onClick={next}><IoIosArrowForward /></ArrowBtn>
      </Container>

      <Nav>
        <NavBtn onClick={prevEnd}> <MdFirstPage /></NavBtn>
        <NavBtn onClick={prev}> <MdChevronLeft /></NavBtn>
        <NavBtn onClick={next}><MdChevronRight /></NavBtn>
        <NavBtn onClick={nextEnd}><MdLastPage /></NavBtn>
      </Nav>
    </div>
  );
}

export default App;
