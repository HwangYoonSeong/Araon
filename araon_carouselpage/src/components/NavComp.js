import styled, { css } from 'styled-components';
import React from 'react';
import {
    MdFirstPage, MdChevronLeft, MdChevronRight,
    MdLastPage, MdApps, MdClear, MdMenu
} from 'react-icons/md'
import { useGlobalState, useDispatch, useGlobalRef, prev, next, prevEnd, nextEnd } from '../Context';
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
function NavComp () {
    const state = useGlobalState();
    const dispatch = useDispatch();
    const { carousel, index, FileUploadRef, AllViewRef } = useGlobalRef();
    const { images, allViewIdx, isModal } = state;

    const allView = () => {
        dispatch({ type: 'SET_ISMODAL', data: false });
        AllViewRef.current.style.marginTop = '-100vh';
    }

    const closeAllView = () => {
        dispatch({ type: 'SET_ISMODAL', data: true });
        AllViewRef.current.style.marginTop = '0vh';
    }

    const home = () => {
        FileUploadRef.current.style.bottom = '-100%';
    }

    const _prev = () => {
        prev(dispatch, carousel, index, allViewIdx);
    }
    const _next = () => {
        next(dispatch, carousel, index, allViewIdx, images.length);
    }
    const _prevEnd = () => {
        prevEnd(dispatch, carousel, index);
    }
    const _nextEnd = () => {
        nextEnd(dispatch, carousel, index, images.length);
    }


    return (
        <Nav>
            {isModal ? (
                <NavBtn onClick={allView}>
                    <MdApps />
                    <AllViewNum><span style={{ color: 'white' }}>{allViewIdx}</span> / {images.length}</AllViewNum>
                </NavBtn>) :
                (
                    <NavBtn isAllView={true} onClick={closeAllView}>
                        <MdClear />
                        <AllViewNum><span style={{ color: 'white' }}>{allViewIdx}</span> / {images.length}</AllViewNum>
                    </NavBtn>)}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <NavBtn onClick={_prevEnd}> <MdFirstPage /></NavBtn>
                <NavBtn onClick={_prev}> <MdChevronLeft /></NavBtn>
                <NavBtn onClick={_next}><MdChevronRight /></NavBtn>
                <NavBtn onClick={_nextEnd}><MdLastPage /></NavBtn>
            </div>

            <NavBtn info={true} onClick={home}><MdMenu /></NavBtn>
        </Nav>
    );
}

export default NavComp;
