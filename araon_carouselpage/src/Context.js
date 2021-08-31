import React, { useReducer, createContext, useContext, } from 'react';
import axios from 'axios';
import ipObj from "./key";

const initialState = {
    brochure: [],
};


function brochureReducer (state, action) {
    switch (action.type) {
        case 'GET_BROCHURE':
            return {
                ...state,
                brochure: action.data
            };


        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const StateContext = createContext();
const DispatchContext = createContext();

export function Provider ({ children }) {
    const [state, dispatch] = useReducer(brochureReducer, initialState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

export function useGlobalState () {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useDispatch () {
    const context = useContext(DispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

// function
export async function getBrochure (dispatch) {
    try {
        const response = await axios.get(
            `${ipObj.server}/carousel/list`
        );
        console.log(response.data);
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

