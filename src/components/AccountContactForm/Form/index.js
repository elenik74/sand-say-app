import React from "react";

import { messages } from "../messages";
import {
    checkValidationFields,
    setValidationError,
} from "../../../helpers/validation";

import { SUCCESS_STATUS } from "../../../helpers/validation/constants";

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.handlerInput = this.handlerInput.bind(this);
        this.handlerClick = this.handlerClick.bind(this);

        this.state = {
            login: {
                value: '',
                isValidate: 'default',
            },
            password: {
                value: '',
                isValidate: 'default',
            },
            nickName: {
                value: '',
                isValidate: 'default',
            },
        }

    }
    componentDidMount() {
        const {
            accountInfo = {},
        } = this.props;

        this.setState({
            login: {
                value: accountInfo.login.value,
                isValidate: 'default',
            },
            password: {
                value: '',
                isValidate: 'default',
            },
            nickName: {
                value: accountInfo.nickName.value,
                isValidate: 'default',
            },
        })
    }

    handlerInput(e) {
        const {
            addDescriptionErrors = Function.prototype,
            accountInfo = {},
        } = this.props;
        const {
            value,
            name,
        } = e.target;

        const errorValidateForm = name !== 'nickName' ? setValidationError[name](value) : SUCCESS_STATUS;
        const hasErrors = Boolean(Object.values(accountInfo).find((data) => data.hasError));

        const currentInput = {
            name,
            hasError: !Boolean(errorValidateForm === SUCCESS_STATUS),
            value,
            isValidate: !hasErrors,
        };

        addDescriptionErrors(currentInput);
        const err = checkValidationFields({ accountInfo });
        this.setState({
            ...err,
        });
    }

    handlerClick(e) {
        e.preventDefault();
        const {
            accountInfo = {},
            requestData = Function.prototype,
        } = this.props;

        let data = checkValidationFields({ accountInfo });
        this.setState({
            ...data,
        });
        const hasErrors = Boolean(Object.values(accountInfo).find((data) => data.hasError));
        if (!hasErrors) {
            data = {
                ...data,
                subLogin: accountInfo.nickName.value,
            }
            requestData(data)
        }
    }
    render() {
        const {
            login,
            password,
        } = this.state;
        const {
            accountInfo = {},
        } = this.props
        return (
            <form action="" className='account-contract-form'>
                <div className='account-contract-form__content'>
                    <label
                        htmlFor='login'
                        className={`account-contract-form__content__label ${login.isValidate}-label`}
                    >
                        {messages.formLoginLabel.defaultMessage}
                    </label>
                    <input
                        id='login'
                        type='text'
                        name='login'
                        defaultValue={login.value}
                        onInput={this.handlerInput}
                        className={`account-contract-form__content__input ${login.isValidate}`}
                    />
                </div>
                <div className='account-contract-form__content'>
                    <div className="label-block">
                        <label
                            htmlFor='nickName'
                            className='account-contract-form__content__label'
                        >
                            {messages.formNickNameLabel.defaultMessage}
                        </label>
                        <span>Опционально</span>
                    </div>
                    <input
                        id='nickName'
                        type='text'
                        name='nickName'
                        onInput={this.handlerInput}
                        className='account-contract-form__content__input'
                    />
                </div>
                <div className='account-contract-form__content'>
                    <label
                        htmlFor='password'
                        className={`account-contract-form__content__label ${password.isValidate}-label`}
                    >
                        {messages.formPasswordLabel.defaultMessage}
                    </label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        defaultValue={password.value}
                        onInput={this.handlerInput}
                        className={`account-contract-form__content__input ${password.isValidate}`}
                    />
                </div>
                <div
                    className='account-contract-form__button'
                >
                    <button
                        className='button'
                        disabled={!accountInfo.isValidate}
                        onClick={this.handlerClick}
                    >
                        {!accountInfo.isLoading && (
                            <span className='account-contract-form__span'>{messages.formButtonName.defaultMessage}</span>
                        )}
                        {accountInfo.isLoading && (
                            <span className='account-contract-form__span loading'></span>
                        )}
                    </button>
                </div>
            </form>
        )
    }
}
export default Form;