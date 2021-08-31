import styled from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import ipObj from "../key";
import { useGlobalState, useDispatch, getBrochure, setBrochure, setImages, useGlobalRef, prevEnd } from '../Context';

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
const Title = styled.div`
  color:white;
  font-size:50px;
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

const BrochureList = styled.div`
display:flex;
flex-wrap:wrap;
align-items:center;
justify-content:space-around;
justify-items:center;
width: 30vw;
height:20vh;
overflow:auto;
`
const Brochure = styled.div`
width: 6vw;
color:white;
font-size:20px;
padding:10px;
text-align:center;
cursor: pointer;
`
function FileUploadComp () {
    const state = useGlobalState();
    const dispatch = useDispatch();
    const { carousel, index, FileUploadRef } = useGlobalRef();

    const file = useRef();
    const [inputImgs, setInputImages] = useState([]);//input 


    useEffect(() => {
        getBrochure(dispatch);
        // console.log(brochureList);
    }, [dispatch]);

    const brochureList = state.brochure;

    const FileOnChange = (e) => {
        setInputImages([...e.target.files]);
    }

    const upload = () => {
        file.current.value = '';
        const formData = new FormData();
        if (inputImgs.length !== 0) {
            for (let i = 0; i < inputImgs.length; i++) {
                formData.append("images[]", inputImgs[i]);
            }
        } else {
            alert("이미지를 입력하세요!!!");
            return;
        }

        let groupname = null;
        while (!groupname) groupname = prompt("이미지 그룹 명을 입력하세요", "br1");
        formData.append("groupname", groupname);

        setBrochure(dispatch, formData);
    }

    const openBrochure = (i) => {
        axios.get(`${ipObj.server}/carousel/list/${brochureList[i].group}`)
            .then(res => {
                // console.log(res.data);
                setImages(dispatch, res.data);
                prevEnd(dispatch, carousel, index);
                // prevEnd();

            })
            .catch(err => {
                console.log(err.response);
            });
        // console.log(FileUploadRef);
        FileUploadRef.current.style.bottom = '0';

    }
    return (
        <FileUploadView ref={FileUploadRef}   >
            <Title>Araon Brochure Page</Title>
            <FileUploadContainer>
                <FileUpload ref={file} type="file" multiple name="images[]" onChange={FileOnChange} />
                <FileUploadBtn onClick={upload}>Upload</FileUploadBtn>
            </FileUploadContainer>
            {brochureList && <BrochureList>
                {brochureList.map((el, i) => {
                    return <Brochure key={i} onClick={() => openBrochure(i)} > {el.group}</Brochure>
                })}
            </BrochureList>}

        </FileUploadView>
    );
}

export default FileUploadComp;
