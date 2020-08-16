import React from 'react';

import {connect} from "react-redux";

import HeaderTerminal from "./Header";
import FooterTerminal from "./Footer";
import {
    logoutRequest,
} from "../../providers/AdminProvider/actions";

import {
    actionInfoSelector,
    authSelector
} from "../../providers/AuthProvider/selectors";

import './../../assets/styles/AccountContactForm/styles.css';
import ContentTerminal from "./Content";


class TerminalForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            logout,
            actionInfo,
            accountInfo,
        } = this.props;

        return (
            <div className="terminal-wrapper">
                <HeaderTerminal
                    accountInfo={accountInfo}
                    logout={logout}
                    actionInfo={actionInfo}
                />
                <ContentTerminal
                    actionInfo={actionInfo}
                />
                <FooterTerminal
                    actionInfo={actionInfo}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        accountInfo: authSelector(state),
        actionInfo: actionInfoSelector(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (data) => dispatch(logoutRequest(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalForm);