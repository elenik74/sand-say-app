import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {headerBox} from "../../../messages";
import {useDispatch} from "react-redux";
import {
    handlerDropdownCopy,
    handlerDropdownDelete,
    handlerDropdownRun
} from "../../../../../providers/AdminProvider/actions";

const NavHeaderButtom = (props) => {
    const {
        item: {
            request = false,
            id,
            status,
        },
        requestHistory,
        onWheelScroll,
    } = props;
    const [isModal, setIsModal] = useState(false);
    const [offset, setOffset] = useState({left: 0})
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const liRef = useRef(null);
    const copyActionRef = useRef(null);
    const nameActionRef = useRef(null);

    useLayoutEffect(() => {
        if (dropdownRef.current && liRef.current) {
            let fontSize = "16px";

            if (liRef.current.clientWidth < 110) {
                fontSize = "10px";
            }

            Object.assign(dropdownRef.current.style,
                {
                    top: "41px",
                    left: `${offset.left - liRef.current.clientWidth + 13}px`,
                    width: `${liRef.current.clientWidth}px`,
                    fontSize: fontSize,
                });
        }

    })

    useMemo(() => setIsModal(false), [onWheelScroll]);

    const switchAction = (id) => {
        return ({
            run: (request) => dispatch(handlerDropdownRun(request, id)),
            copy: () => {
                copyActionRef.current.style.display = "block";

                setTimeout(() => {
                    copyActionRef.current.style.display = "none";
                }, 1000);

                Object.assign(copyActionRef.current.style,
                    {
                        display: "block",
                        animation: "moveUp ease 1s",
                    });
                dispatch(handlerDropdownCopy(id));
            },
            delete: () => {
                setIsModal(!isModal);
                dispatch(handlerDropdownDelete(id));
            }
        })
    }
    const showModal = (e) => {
        setOffset({
            left: e.clientX,
        });
        setIsModal(!isModal);
    }

    const handleClick = (e) => {

        const idAction = String(e.nativeEvent.path[3].id);
        const nameAction = e.target.getAttribute("name");

        const currentRequest = requestHistory.find((item) => String(item.id) === idAction);
        if (currentRequest) {
            const runAction = switchAction(idAction);
            runAction[nameAction](currentRequest.request);
        }
    }

    const actionName = request;

    return <li className="header-action-nav__item" ref={liRef}>
        <div className={`header-action-nav__item__status ${status}-status`}>
        </div>
        <span className={`header-action-nav__item__span`}>
            <p ref={nameActionRef}>{actionName.action}</p>
            <p ref={copyActionRef}>{headerBox.copyAction.defaultMessage}</p>
        </span>
        <div className="header-action-nav__item__dropdown">
            <div
                className="dropdown"
                onClick={showModal}
            >
                <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="2" fill="black" fillOpacity="0.2"/>
                    <circle cx="2" cy="9" r="2" fill="black" fillOpacity="0.2"/>
                    <circle cx="2" cy="16" r="2" fill="black" fillOpacity="0.2"/>
                </svg>
            </div>
        </div>
        {isModal && onWheelScroll && (
            <div
                className="header-action-nav__item__dropdown-list"
                id={id}
                ref={dropdownRef}
            >
                <ul>
                    <li><p onClick={handleClick} name={"run"}>{headerBox.run.defaultMessage}</p></li>
                    <li><p onClick={handleClick} name={"copy"}>{headerBox.copy.defaultMessage}</p></li>
                    <li><p onClick={handleClick} name={"delete"}>{headerBox.delete.defaultMessage}</p></li>
                </ul>
            </div>
        )}
    </li>
}

export default NavHeaderButtom;