import styled, { css } from 'styled-components';
import React from 'react';
import ipObj from "../key";
import { useGlobalState, useDispatch, useGlobalRef, setallViewIdx } from '../Context';
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


function AllViewComp () {
    const state = useGlobalState();
    const dispatch = useDispatch();
    const { carousel, index, AllViewRef } = useGlobalRef();
    const { images, allViewIdx } = state;

    const selectPage = (idx) => {
        dispatch({ type: 'SET_ISMODAL', data: true });
        setallViewIdx(dispatch, idx + 1);
        AllViewRef.current.style.marginTop = '0';
        index.current = idx;
        carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;
    }

    return (
        < Allview imgsLen={images.length} ref={AllViewRef} >

            {images.map((el, i) => {
                return <ViewImg key={i} cur={allViewIdx - 1} idx={i} onClick={() => selectPage(i)} src={`${ipObj.server}/images/${el.image}`}></ViewImg>
            })
            }

        </Allview>
    );
}

export default AllViewComp;
