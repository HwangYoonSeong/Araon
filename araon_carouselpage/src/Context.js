import React, { useReducer, createContext, useContext, useRef, } from 'react';
import axios from 'axios';
import ipObj from "./key";

const initialState = {
    brochure: [],
    images: [],
    allViewIdx: 1,
    isModal: true,
};


function brochureReducer (state, action) {
    switch (action.type) {
        case 'GET_BROCHURE':
            return {
                ...state,
                brochure: action.data
            };

        case 'SET_IMAGES':
            return {
                ...state,
                images: action.data
            };

        case 'SET_ALLVIEWIDX':
            return {
                ...state,
                allViewIdx: action.data
            };
        case 'SET_ISMODAL':
            return {
                ...state,
                isModal: action.data
            };


        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const StateContext = createContext();
const DispatchContext = createContext();
const RefContext = createContext();

export function Provider ({ children }) {
    const [state, dispatch] = useReducer(brochureReducer, initialState);
    const carousel = useRef();
    const index = useRef(0);
    const AllViewRef = useRef();
    const FileUploadRef = useRef();
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <RefContext.Provider value={{ carousel, index, AllViewRef, FileUploadRef }}>
                    {children}
                </RefContext.Provider>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

export function useGlobalState () {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}

export function useDispatch () {
    const context = useContext(DispatchContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}

export function useGlobalRef () {
    const context = useContext(RefContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}

// images function
export async function getBrochure (dispatch) {
    try {
        const response = await axios.get(
            `${ipObj.server}/carousel/list`
        );
        dispatch({ type: 'GET_BROCHURE', data: response.data });

    } catch (e) {
        console.log(e);
    }
}

export async function setBrochure (dispatch, formData) {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
        }
    };
    try {
        await axios.post(`${ipObj.server}/carousel/input`, formData, config);
        getBrochure(dispatch);
    } catch (e) {
        console.log(e);
    }
}

export async function setImages (dispatch, images) {
    dispatch({ type: 'SET_IMAGES', data: images });
}

export async function setallViewIdx (dispatch, idx) {
    dispatch({ type: 'SET_ALLVIEWIDX', data: idx });
}


// nav function
export async function prevEnd (dispatch, carousel, index) {
    index.current = 0;
    setallViewIdx(dispatch, 1);
    carousel.current.style.transform = `translate3d(0, 0, 0)`;
}

export async function prev (dispatch, carousel, index, allViewIdx) {
    if (index.current === 0) return;
    index.current -= 1;
    setallViewIdx(dispatch, allViewIdx - 1);
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;
}

export async function next (dispatch, carousel, index, allViewIdx, imagesLen) {
    if (index.current === imagesLen - 1) return;
    index.current += 1;
    setallViewIdx(dispatch, allViewIdx + 1);
    carousel.current.style.transform = `translate3d(-${90 * index.current}vw, 0, 0)`;
}

export async function nextEnd (dispatch, carousel, index, imagesLen) {
    index.current = imagesLen - 1;
    setallViewIdx(dispatch, imagesLen);
    carousel.current.style.transform = `translate3d(-${90 * (imagesLen - 1)}vw, 0, 0)`;
}


