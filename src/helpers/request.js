import Sendsay from "sendsay-api";
import { SEND_SAY_ACTION } from "../providers/AuthProvider/constants";

export default function request(options = {}) {
    const newOptions = {
        ...options,
    };
    let auth = {};

    if (newOptions.action === SEND_SAY_ACTION.LOGIN) {
        auth = {
            login: newOptions.login,
            passwd: newOptions.passwd,
        };
    }
    const sendsay = new Sendsay({
        ...auth,
    });
    return sendsay.request({
        ...newOptions,
    })
}