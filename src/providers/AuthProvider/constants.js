export const AUTHORIZE_ERROR = 'AUTHORIZE_ERROR';
export const AUTHORIZE_REQUEST = 'AUTHORIZE_REQUEST';
export const AUTHORIZE_USER = 'AUTHORIZE_ERROR';
export const AUTHORIZE_VALIDATION_ERROR = 'AUTHORIZE_VALIDATION_ERROR';
export const AUTHORIZE_RECEIVE = 'AUTHORIZE_RECEIVE';
export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const STATES = Object.freeze({
    auth: 'auth',
    admin: 'admin',
});

export const INPUT_NAME = Object.freeze({
    LOGIN: 'login',
    SUB_LOGIN: 'nickName',
    PASSWORD: 'password',
});

export const SEND_SAY_ACTION = Object.freeze({
    LOGIN: 'login',
    LOGOUT: 'logout',
    SETTING: 'sys.settings.get',
    IS_AUTH: 'pong',
})