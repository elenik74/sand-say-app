import {
    LOGOUT_REQUEST,
    LOGOUT_RECEIVE,
    LOGOUT_ERROR,
    SEND_ACTION_REQUEST,
    SEND_ACTION_RECEIVE,
    SEND_ACTION_ERROR,
    SEND_INTRODUCED_ACTION,
    CHECK_VALIDATE_FORMS,
    VALIDATE_FORMS_ERROR,
    FORMAT_MESSAGE,
    FORMAT_MESSAGE_SUCCESS,
    HANDLER_DROPDOWN_COPY,
    HANDLER_DROPDOWN_RUN,
    HANDLER_DROPDOWN_DELETE,
    HANDLER_DELETE_ACTIONS,
} from "./constants";

export function logoutRequest(formData) {
    return {
        type: LOGOUT_REQUEST,
        formData,
    };
}
export function logoutReceive(formData) {
    return {
        type: LOGOUT_RECEIVE,
        formData,
    };
}
export function logoutError() {
    return {
        type: LOGOUT_ERROR,
    };
}
export function sendActionRequest(data) {
    return {
        type: SEND_ACTION_REQUEST,
        data,
    };
}
export function sendActionReceive(actionData, id) {
    return {
        type: SEND_ACTION_RECEIVE,
        actionData,
        id,
    };
}
export function sendActionError(err) {
    return {
        type: SEND_ACTION_ERROR,
        err,
    };
}
export function enterActionFromTextarea(data) {
    return {
        type: SEND_INTRODUCED_ACTION,
        data,
    };
}
export function checkValidateForm(data) {
    return {
        type: CHECK_VALIDATE_FORMS,
        data,
    };
}
export function validateFormsError(data) {
    return {
        type: VALIDATE_FORMS_ERROR,
        data,
    };
}
export function formatMessage(data) {
    return {
        type: FORMAT_MESSAGE,
        data,
    };
}
export function formatMessageSuccess(message) {
    return {
        type: FORMAT_MESSAGE_SUCCESS,
        message,
    };
}
export function handlerDropdownRun(data, id) {
    return {
        type: HANDLER_DROPDOWN_RUN,
        data,
        id,
    }
}
export function handlerDropdownCopy(id) {
    return {
        type: HANDLER_DROPDOWN_COPY,
        id,
    }
}
export function handlerDropdownDelete(id) {
    return {
        type: HANDLER_DROPDOWN_DELETE,
        id,
    }
}
export function handlerDeleteActions() {
    return {
        type: HANDLER_DELETE_ACTIONS,
    }
}