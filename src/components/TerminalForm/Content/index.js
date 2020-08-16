import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from 'react-redux'

import {contentBox} from "../messages";
import {enterActionFromTextarea} from "../../../providers/AdminProvider/actions";

const ContentTerminal = (props) => {
    const {
        actionInfo,
    } = props;
    const contentRef = useRef();
    const leftBarRef = useRef();
    const rightBarRef = useRef();
    const middleBarRef = useRef();

    const dispatch = useDispatch();
    useEffect(() => {
        middleBarRef.current.addEventListener('mousedown', onMovement);
        document.addEventListener('mouseup', offMovement);

        return (() => document.removeEventListener('mouseup', offMovement))
    }, []);

    let activeRequest = '';

    let isFormatMessage = false;
    let formatMessage = '';

    if (actionInfo.sendActionValue) {
        isFormatMessage = actionInfo.format;

        formatMessage = isFormatMessage && JSON.stringify(JSON.parse(actionInfo.sendActionValue), null, '\t');
    }
    const mouseWheelHandler = (e) => {
        e.preventDefault();

        const innerWidth = e.view.innerWidth - 1;
        const halfWidth = Math.floor(innerWidth / 2);

        const screenX = e.screenX;

        const middlePoint = halfWidth - screenX;
        const step = halfWidth / 50;

        const moveStep = Math.floor(middlePoint / step);

        if (Math.floor(Math.abs(middlePoint % step)) === 0) {
            leftBarRef.current.style.width = `${50 - moveStep}%`;
            rightBarRef.current.style.width = `${50 + moveStep}%`;
        }

    }
    const handleChange = (e) => {
        const valueTextarea = e.target.value;
        dispatch(enterActionFromTextarea(valueTextarea));
    }

    if (actionInfo.requestHistory.length > 0) {
        activeRequest = actionInfo.requestHistory.find((data) => data.id === actionInfo.active);
    }
    const onMovement = (e) => {
        e.preventDefault();
        contentRef.current.addEventListener('mousemove', mouseWheelHandler);
    }
    const offMovement = (e) => {
        e.preventDefault();
        contentRef.current.removeEventListener('mousemove', mouseWheelHandler);
    }
    return (
        <div className='terminal-wrapper__content' ref={contentRef}>
            <div
                className='terminal-wrapper__content__left-bar'
                ref={leftBarRef}
            >
                <span className={`left-bar__span ${!actionInfo.isValidate ? 'error-span' : ''}`}>
                    {contentBox.request.defaultMessage}
                </span>
                <div className="left-bar__textarea">
                    <textarea
                        className={!actionInfo.isValidate ? 'error-textarea' : 'success-textarea'}
                        onChange={handleChange}
                        value={isFormatMessage ? formatMessage : actionInfo.sendActionValue}
                    />
                </div>
            </div>
            <div className='terminal-wrapper__content__middle-bar'>
                <span
                    className='middle-bar__movement'
                    ref={middleBarRef}
                >
                    <svg width="5" height="18" viewBox="0 0 5 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <circle cx="2.92859" cy="2" r="2" fill="black" fillOpacity="0.2"/>
                            <circle cx="2.92859" cy="9" r="2" fill="black" fillOpacity="0.2"/>
                            <circle cx="2.92859" cy="16" r="2" fill="black" fillOpacity="0.2"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="4" height="18" fill="white" transform="translate(0.928589)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </span>
            </div>
            <div
                className='terminal-wrapper__content__right-bar'
                ref={rightBarRef}
            >
                <span className='right-bar__span'>
                    {contentBox.recieve.defaultMessage}
                </span>
                <div className="right-bar__textarea">
                    <textarea
                        className={activeRequest && activeRequest.status === 'error' ? 'error-textarea' : 'success-textarea'}
                        disabled={true}
                        value={activeRequest && actionInfo.isShow ? JSON.stringify(activeRequest.receive, null, "\t") : ''}
                    />
                </div>
            </div>
        </div>
    )
}

export default ContentTerminal;