import styled, { css } from 'styled-components';
import React from 'react';
import {
    MdFirstPage, MdChevronLeft, MdChevronRight,
    MdLastPage, MdApps, MdClear, MdMenu
} from 'react-icons/md'

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
function NavComp ({ isModal, setModal, showImgs, AllViewRef, FileUploadRef, prev, next, prevEnd, nextEnd, allViewIdx }) {
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
    );
}

export default NavComp;
