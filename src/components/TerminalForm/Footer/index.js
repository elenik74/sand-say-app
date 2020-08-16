import React from "react";
import { useDispatch } from "react-redux";
import { messages } from "../messages";

import {
    checkValidateForm,
    formatMessage
} from "../../../providers/AdminProvider/actions";

const FooterTerminal = (props) => {
    const dispatch = useDispatch();
    const {
        actionInfo,
    } = props;

    const dispatchSendAction = () => {
        dispatch(checkValidateForm(actionInfo))
    }
    const formatTextAction = () => {
        dispatch(formatMessage(actionInfo))
    }
    return (
        <div className='terminal-wrapper__footer'>
            <ul className='footer-nav'>
                <li className='footer-nav__item footer__send'>
                    <button
                        className='button'
                        onClick={dispatchSendAction}
                    >{messages.sendAction.defaultMessage}</button>
                </li>
                <li className='footer-nav__item footer__link'>
                    {'Link'}
                </li>
                <li
                    className='footer-nav__item footer__format'
                    onClick={formatTextAction}
                >
                    {messages.formatAction.defaultMessage}
                </li>
            </ul>
        </div>
    )
}

export default FooterTerminal;