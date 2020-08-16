import React, {useEffect, useRef, useState} from "react";

import {
    fullScreenCancel,
    fullScreenOpen
} from "../../../helpers/document";

import NavHeaderButtom from "./Nav/Buttom";
import NavHeaderTop from "./Nav/Top";
import {messages} from "../messages";
import {useDispatch} from "react-redux";
import {handlerDeleteActions} from "../../../providers/AdminProvider/actions";

const STEP_SCROLL = 25;
const PADDING = 20;
const BEGIN_SCROLL = 0;

const HeaderTerminal = (props) => {
    let x = 0;
    const {
        accountInfo,
        actionInfo: {
            requestHistory,
        },
        logout,
    } = props;

    const [onFullScreen, setOnFullScreen] = useState(false);
    const [onWheelScroll, setOnWheelScroll] = useState(false);
    const ulRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const ul = ulRef.current;

        ul.addEventListener("mousewheel", wheelHandler);

        changeWindowSize();

        return () => ul.removeEventListener("mousewheel", wheelHandler);
    }, [onFullScreen]);

    const toggleFullScreenState = () => {
        setOnFullScreen((prev) => !prev);
    }

    const changeWindowSize = () => {
        if (onFullScreen) {
            fullScreenOpen();
        } else {
            fullScreenCancel();
        }
    }

    const wheelHandler = (e) => {
        ulRef.current.style.overflowX = "scroll";
        ulRef.current.style.overflowY = "hidden";

        setTimeout(() => {
            setOnWheelScroll(false);
        }, 500);

        if (e.deltaY > BEGIN_SCROLL) {
            const scrollWidth = ulRef.current.scrollWidth;
            const offsetWidth = ulRef.current.offsetWidth;

            const endPoint = Math.floor(scrollWidth - offsetWidth);

            if (x > endPoint) {
                x = x;
            } else {
                x += STEP_SCROLL;
            }
        } else {
            if (x <= BEGIN_SCROLL + PADDING) {
                x = BEGIN_SCROLL;
            } else {
                x -= STEP_SCROLL;
            }
        }
        if (!onWheelScroll) {
            setOnWheelScroll(true);
        }
        ulRef.current.scrollTo(x, BEGIN_SCROLL);
    }
    const deleteActionsHandler = () => {
        dispatch(handlerDeleteActions())
    }
    const isRequestHistory = Boolean(requestHistory.length > 0);
    return (
        <div className="terminal-wrapper__header">
            <div className="terminal-wrapper__header-top">
                <NavHeaderTop
                    accountInfo={accountInfo}
                    logout={logout}
                    toggleFullScreenState={toggleFullScreenState}
                />
            </div>
            <div className="terminal-wrapper__header-bottom">
                <ul
                    className="header-action-nav"
                    ref={ulRef}
                >
                    {isRequestHistory && requestHistory.map((item, index) =>
                        <NavHeaderButtom
                            item={item}
                            key={index}
                            requestHistory={requestHistory}
                            onWheelScroll={!onWheelScroll}
                        />
                    )}
                    {!isRequestHistory && (
                        <div>{messages.warning.emptyNav.defaultMessage}</div>
                    )}
                </ul>
                <div className="header-delete-action">
                    <div
                        className='header-delete-action__icon'
                        onClick={deleteActionsHandler}
                    >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTerminal;