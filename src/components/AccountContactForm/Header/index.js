import React from "react";
import {
    errorLang,
    messages
} from "../messages";

function Header(props) {
    const {
        error,
        messageError,
    } = props;
    return (
        <div className='account-contract-header'>
            { messages.formName.defaultMessage }
            {error && (
                <div className='account-contract-header__wrapper'>
                    <div className='account-contract-header__error-block'>
                        <span className='account-contract-header__span'>{ errorLang.loginFailed.defaultMessage }</span>
                        <span className='account-contract-header__span'>{ messageError.map(data => data) }</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header;
