import React from "react";

import { messages } from "../../../messages";
import Logo from "../../../../AccountContactForm/Logo";

const NavHeaderTop = (props) => {

    return <ul className='header-nav'>

        <li className='header-nav__item header__logo'>
            <Logo/>
        </li>
        <li className='header-nav__item header__name'>
            {messages.name.defaultMessage}
        </li>
        <li className='header-nav__item header__login'>
            <span>{props.accountInfo.login.value}</span>
            {props.accountInfo.nickName.value && (
                <span>
                    <b>:</b>{props.accountInfo.nickName.value}
                </span>
            )}
        </li>
        <li
            className='header-nav__item header__logout'
            onClick={props.logout}
        >
            {'Выйти'}
        </li>
        <li
            className='header-nav__item header__scale'
            onClick={props.toggleFullScreenState}
        >
        </li>
    </ul>
}

export default NavHeaderTop;

