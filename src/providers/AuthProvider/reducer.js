import { fromJS } from 'immutable';
import {
    AUTHENTICATION_REQUEST,
    AUTHORIZE_ERROR,
    AUTHORIZE_RECEIVE,
    AUTHORIZE_REQUEST,
    AUTHORIZE_USER,
    AUTHORIZE_VALIDATION_ERROR,
    INPUT_NAME, LOGIN_ERROR
} from './constants';
import {LOGOUT_RECEIVE} from "../AdminProvider/constants";

const initialState = {
    [INPUT_NAME.LOGIN]: {
        value: '',
        hasError: true,
    },
    [INPUT_NAME.PASSWORD]: {
        value: '',
        hasError: true,
    },
    [INPUT_NAME.SUB_LOGIN]: {
        value: ''
    },
    isAuth: false,
    isLoading: false,
    isLoadingAuth: false,
    isValidate: false,
    hasLoginError: false,
    hasAuthError: false,
    messageError: [],
};

function AuthProviderReducer(state = initialState, action) {
    let newState = {};

    switch (action.type) {
        case AUTHORIZE_ERROR:
            return {
                ...state,
                hasAuthError: true,
                isAuth: false,
                isLoading: false,
                isLoadingAuth: false,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                hasLoginError: true,
                isAuth: false,
                isLoading: false,
                isLoadingAuth: false,
                messageError: [action.error],
            };
        case AUTHENTICATION_REQUEST:
            return {
                ...state,
                isLoadingAuth: true,
            };
        case AUTHORIZE_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case AUTHORIZE_RECEIVE:
            const account = localStorage.getItem('login');
            const subLogin = localStorage.getItem('subLogin');

            return {
                ...state,
                login: {
                    ...state.login,
                    value: account
                },
                nickName: {
                    value: subLogin,
                },
                hasAuthError: false,
                hasLoginError: false,
                isAuth: true,
                isLoading: false,
                isLoadingAuth: false,
                messageError: [],
            };
        case AUTHORIZE_USER:
            return state;
        case LOGOUT_RECEIVE: {
            return {
                ...state,
                isAuth: false,
                login: {
                    hasError: true,
                    value: '',
                },
                password: {
                    hasError: true,
                    value: '',
                },
                nickName: {
                    value: '',
                },
                isValidate: false,
            }
        }
        case AUTHORIZE_VALIDATION_ERROR:
            const {
                hasError,
                value,
                name,
                isValidate,
            } = action.err;
            newState = {};

            if (name === INPUT_NAME.SUB_LOGIN) {
                newState = {
                    [INPUT_NAME.SUB_LOGIN]: {
                        value,
                    }
                }
            } else {
                newState = {
                    [name]: {
                        value,
                        hasError,
                    },
                    isValidate,
                }
            }
            return Object.assign({}, state, newState);
        default:
            return state;
    }
}

export default AuthProviderReducer;