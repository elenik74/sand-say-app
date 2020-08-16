import React from 'react';

import Form from "./Form";
import Header from "./Header";

import {
    authSelector
} from "../../providers/AuthProvider/selectors";
import {
    authorizeError,
    authorizeRequest
} from "../../providers/AuthProvider/actions";
import { connect } from "react-redux";

import './../../assets/styles/AccountContactForm/styles.css';

function AccountContractForm(props) {
    const {
        addDescriptionErrors,
        requestData,
        accountInfo,
    } = props;
    return (
        <div className='account-contract'>
            <Header
                error={accountInfo.hasLoginError}
                messageError={accountInfo.messageError}
            />
            <Form
                addDescriptionErrors={addDescriptionErrors}
                requestData={requestData}
                accountInfo={accountInfo}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        accountInfo: authSelector(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDescriptionErrors: (err) => dispatch(authorizeError(err)),
        requestData: (data) => dispatch(authorizeRequest(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContractForm);