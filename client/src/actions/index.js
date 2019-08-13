import streams from '../apis/streams'
import {SIGN_IN, SIGN_OUT} from './types'

export const signInAction = userId => {
    return {
        type:SIGN_IN,
        payload:userId
    };
};

export const signOutAction = () =>{
    return {
        type:SIGN_OUT
    };
};

//dbに保存
export const createStream =formValues => async dispatch => {
    streams.post('/streams',formValues);
}