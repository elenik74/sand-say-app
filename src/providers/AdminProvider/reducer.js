import { v4 as uuidv4 } from 'uuid';
import { splice } from "../../helpers/helpMethods";

import {
    LOGOUT_REQUEST,
    LOGOUT_RECEIVE,
    LOGOUT_ERROR,
    SEND_ACTION_REQUEST,
    SEND_ACTION_RECEIVE,
    SEND_ACTION_ERROR,
    SEND_INTRODUCED_ACTION,
    VALIDATE_FORMS_ERROR,
    FORMAT_MESSAGE,
    FORMAT_MESSAGE_SUCCESS,
    HANDLER_DROPDOWN_COPY,
    HANDLER_DROPDOWN_DELETE, HANDLER_DELETE_ACTIONS,
} from './constants';

const initialState = {
    sendActionValue: '',
    requestHistory: [],
    isValidate: true,
    isShow: false,
    active: null,
    format: false,
};

function AdminProviderReducer(state = initialState, action) {
    let newRequestHistory = [...state.requestHistory];
    let result = {};
    let sortReceive = null;
    const idGenerate = uuidv4();

    switch (action.type) {
        case LOGOUT_REQUEST:
            return state;
        case LOGOUT_RECEIVE:
            return state;
        case LOGOUT_ERROR:
            return state;
        case SEND_ACTION_REQUEST:
            return state;
        case SEND_ACTION_RECEIVE:
            const {
                actionData,
                id = false,
            } = action;
            result = {
                id: idGenerate,
                request: actionData.request,
                receive: actionData.receive,
                status: 'success',
                isShow: true,
            }
            if (id) {
                const findActionsIndex = state.requestHistory.findIndex((data) => data.id === id);
                result = {
                    ...result,
                    id: idGenerate,
                }
                newRequestHistory.splice(findActionsIndex, 1, result);
            } else {
                newRequestHistory.push(result)
            }
            return {
                ...state,
                requestHistory: newRequestHistory,
                isValidate: true,
                active: idGenerate,
                isShow: true,
                sendActionValue: JSON.stringify(actionData.request),
            };
        case SEND_ACTION_ERROR:
            const {
                err,
            } = action;
            sortReceive = splice(err);
            result = {
                id: idGenerate,
                request: err.request,
                receive: sortReceive,
                status: 'error',
            }
            newRequestHistory.push(result)
            return {
                ...state,
                requestHistory: newRequestHistory,
                isValidate: true,
                isShow: true,
                active: idGenerate,
            };
        case SEND_INTRODUCED_ACTION:
            return {
                ...state,
                sendActionValue: action.data,
                format: false,
            };
        case VALIDATE_FORMS_ERROR:
            return {
                ...state,
                isValidate: false,
                isShow: false,
                format: false,
            }
        case FORMAT_MESSAGE:
            return state;
        case FORMAT_MESSAGE_SUCCESS:
            return {
                ...state,
                format: true,
            }
        case HANDLER_DROPDOWN_COPY:
            let findActionsEl = state.requestHistory.find((data) => data.id === action.id);

            findActionsEl = {
                ...findActionsEl,
                id: idGenerate,
            }
            newRequestHistory = [
                ...newRequestHistory,
                findActionsEl,
            ]
            return {
                ...state,
                requestHistory: newRequestHistory,
                isValidate: true,
                isShow: true,
            }
            case HANDLER_DROPDOWN_DELETE:
                let findIndexDeleteItem = state.requestHistory.findIndex((data) => data.id === action.id);
                newRequestHistory.splice(findIndexDeleteItem, 1);
                return {
                    ...state,
                    requestHistory: newRequestHistory,
                    isValidate: true,
                    isShow: true,
                    sendActionValue: '',
                }
            case HANDLER_DELETE_ACTIONS: {
                return {
                    ...state,
                    requestHistory: [],
                    active: null,
                    sendActionValue: '',
                }
            }
        default:
            return state;
    }
}

export default AdminProviderReducer;