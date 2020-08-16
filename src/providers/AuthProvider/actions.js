import {
    AUTHORIZE_REQUEST,
    AUTHORIZE_VALIDATION_ERROR,
    AUTHORIZE_RECEIVE,
    AUTHENTICATION_REQUEST,
    AUTHORIZE_ERROR,
    LOGIN_ERROR,
} from "./constants";

export function authorizeRequest(formData) {
    return {
        type: AUTHORIZE_REQUEST,
        formData,
    };
}
export function authorizeReceive(formData) {
    return {
        type: AUTHORIZE_RECEIVE,
        formData,
    };
}
export function authRequest() {
    return {
        type: AUTHENTICATION_REQUEST,
    };
}
export function authorizeError(err) {
    return {
        type: AUTHORIZE_VALIDATION_ERROR,
        err,
    };
}

export function authError() {
    return {
        type: AUTHORIZE_ERROR,
    };
}

export function loginError(error) {
    return {
        type: LOGIN_ERROR,
        error,
    };
}

