import React from "react";
import {connect} from "react-redux";

import "../assets/styles/App.css";

import { authSelector } from "../providers/AuthProvider/selectors";

import AccountContractForm from "./AccountContactForm";
import TerminalForm from "./TerminalForm";
import Loading from "./Loading/Loading";
import Logo from "./AccountContactForm/Logo";
import Link from "./AccountContactForm/Link";

const AUTH_FORM = [
        <Logo key={0}/>,
        <AccountContractForm key={1}/>,
        <Link key={2}/>,
    ];

const App = (props) => {
    const {
        isAuth,
        isLoadingAuth,
    } = props.getAuth;

    let wrapper = "Wrapper";
    if (isAuth) {
        wrapper = "Wrapper-terminal"
    }
    return (
        <div className={wrapper}>
            {/* Рендер формы авторизации */}
            {!isAuth && !isLoadingAuth && (
                AUTH_FORM.map((item) => item)
            )}
            {/* Рендер формы терминала */}
            {isAuth && !isLoadingAuth && (
                <TerminalForm/>
            )}
            {/* Рендер лоадинга, если что-то пошло не так */}
            {isLoadingAuth && (
                <Loading/>
            )}
        </div>

    );
};
const mapStateToProps = (state) => {
    return {
        getAuth: authSelector(state)
    }
}
export default connect(mapStateToProps, null)(App);
