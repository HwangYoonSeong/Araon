import styled, { css } from 'styled-components';
import React from 'react';
import ipObj from "../key";
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


function AllViewComp ({ showImgs, AllViewRef, allViewIdx, isUploaded, selectPage }) {

    return (
        < Allview imgsLen={showImgs.length} ref={AllViewRef} >

            {isUploaded ? (showImgs.map((el, i) => {
                return <ViewImg key={i} cur={allViewIdx - 1} idx={i} onClick={() => selectPage(i)} src={`${ipObj.server}/images/${el.image}`}></ViewImg>
            })) : null
            }

        </Allview>
    );
}

export default AllViewComp;
