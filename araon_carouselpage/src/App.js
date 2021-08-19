import styled, { css } from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import axios from 'axios';
import ipObj from "./key";
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
  flex-basis:33.33%;
  width:80px;
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
  const [isUploaded, setIsUploaded] = useState(false);

  // useEffect(() => {
  //   console.log("1");

  //   axios.delete(`${ipObj.server}/carousel`)
  //     .then(res => {

  //     })
  //     .catch(err => {
  //       console.log(err.response);
  //     });

  // }, []);


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
    if (index.current === imgs.length - 1) return;
    index.current += 1;
    setallViewIdx(allViewIdx + 1);
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;
  }
  const nextEnd = () => {
    index.current = imgs.length - 1;
    setallViewIdx(imgs.length);
    carousel.current.style.transform = `translate3d(-${90 * (imgs.length - 1)}vw, 0, 0)`;
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
    setImages([...imgs, ...e.target.files]);
  }

  const upload = () => {
    FileUploadRef.current.style.bottom = '0';

    const formData = new FormData();
    if (imgs != null) {
      for (let i = 0; i < imgs.length; i++) {
        formData.append("images[]", imgs[i]);
      }
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      }
    };
    // 서버의 upload API 호출
    axios.post(`${ipObj.server}/carousel`, formData, config)
      .then(res => {
        setIsUploaded(true);
      })
      .catch(err => {
        console.log(err.response);
      });

  }
  return (
    <div className="App" >
      <Container>
        < FileUploadView ref={FileUploadRef}   >
          <Title>Araon Carousel Page</Title>
          <FileUploadContainer>
            <FileUpload type="file" multiple name="images[]" onChange={FileOnChange} />
            <FileUploadBtn onClick={upload}>Upload</FileUploadBtn>
          </FileUploadContainer>

        </FileUploadView>
        <CarouselContainer>
          <ArrowBtn onClick={prev}> <IoIosArrowBack /></ArrowBtn>
          <Wrapper >
            <Carousel ref={carousel}>
              {isUploaded ? (imgs.map((el, i) => {
                return <Content key={i}> <Img src={`${ipObj.server}/images/${el.name}`}></Img></Content>
              })) : null
              }
            </Carousel>
          </Wrapper>

          <ArrowBtn onClick={next}><IoIosArrowForward /></ArrowBtn>
        </CarouselContainer >

        <Nav>
          {isModal ? (
            <NavBtn isModal={isModal} onClick={allView}>
              <MdApps />
              <AllViewNum><span style={{ color: 'white' }}>{allViewIdx}</span> / {imgs.length}</AllViewNum>
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
          {isUploaded ? (imgs.map((el, i) => {
            return <ViewImg key={i} cur={allViewIdx - 1} idx={i} onClick={() => selectPage(i)} src={`${ipObj.server}/images/${el.name}`}></ViewImg>
          })) : null
          }
        </Allview>

      </Container >

    </div >
  );
} export default App;
