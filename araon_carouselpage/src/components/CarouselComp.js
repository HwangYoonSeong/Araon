import styled from 'styled-components';
import React from 'react';
import ipObj from "../key";
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
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
function FileUploadComp ({ isUploaded, carousel, showImgs, prev, next }) {

    return (
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
    );
}

export default FileUploadComp;
