import styled from 'styled-components';
import React from 'react';
import ipObj from "../key";
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import { useGlobalState, useDispatch, useGlobalRef, prev, next } from '../Context';
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
function CarouselComp () {
    const state = useGlobalState();
    const dispatch = useDispatch();
    const { carousel, index } = useGlobalRef();
    const { images, allViewIdx } = state;
    const _prev = () => {
        prev(dispatch, carousel, index, allViewIdx);
    }
    const _next = () => {
        next(dispatch, carousel, index, allViewIdx, images.length);
    }
    return (
        <CarouselContainer>
            <ArrowBtn onClick={_prev}> <IoIosArrowBack /></ArrowBtn>
            <Wrapper >
                <Carousel ref={carousel}>
                    {images.map((el, i) => {
                        return <Content key={i}> <Img src={`${ipObj.server}/images/${el.image}`}></Img></Content>
                    })
                    }
                </Carousel>
            </Wrapper>

            <ArrowBtn onClick={_next}><IoIosArrowForward /></ArrowBtn>
        </CarouselContainer >
    );
}

export default CarouselComp;
