const SET_TOKEN = "token/SET_TOKEN";

export const setToken = (token) => ({ type: SET_TOKEN, token });

const initialtoken = '';

export default function token (state = initialtoken, action) {
    if (action.type === SET_TOKEN) return action.token;
    else return state;
}
