import {
    EMPTY_FIELD_STATUS,
    INCORRECTLY_FILLED_STATUS,
    SUCCESS_STATUS
} from "./constants";

export const setValidationError = {
    login: (str) => {
        if (str.length === 0) {
            return EMPTY_FIELD_STATUS;
        } else {
            const regExp = /^[a-z]+([-_.@]?[a-z0-9]+){4,10}$/i;
            if (Boolean(regExp.test(str))) {
                return SUCCESS_STATUS;
            } else {
                return INCORRECTLY_FILLED_STATUS;
            }
        }
    },
    password: (str) => {
        if (str.length === 0) {
            return EMPTY_FIELD_STATUS;
        } else if (/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})$/.test(str)) {
            return SUCCESS_STATUS;
        } else return INCORRECTLY_FILLED_STATUS;
    },
}

export const checkValidationFields = (props) => {
    const {
        accountInfo = {},
    } = props;
    const err = Object.values(accountInfo).reduce((prev, data, index) => {
        const fieldsErrorValidation = Object.keys(accountInfo)[index];
        if (data.hasOwnProperty('hasError')) {
            return {
                ...prev,
                [fieldsErrorValidation]: {
                    value: data.value,
                    isValidate: data.hasError ? 'error' : 'default',
                }
            }
        }
        return prev;
    }, {});
    return err;
}