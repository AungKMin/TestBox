import { AUTH, ERROR, REMOVE } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => { 
    try {
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data } = await api.signIn(formData);
        const action = {
            type: AUTH,
            data
        }
        dispatch(action);

        history.push('/');
    } catch (error) {
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch) => { 
    try {
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data } = await api.signUp(formData);
        const action = {
            type: AUTH,
            data
        }
        dispatch(action);

        history.push('/');
    } catch (error) {
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
};