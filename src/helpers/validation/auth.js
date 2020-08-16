import {authRequest} from "../../providers/AuthProvider/actions";

function logger({ getState }) {
    return next => action => {
        console.log('will dispatch', action)

        // Вызовем следующий метод dispatch в цепочке мидлваров.
        const returnValue = next(action)

        console.log('state after dispatch', getState())

        // Это наверняка будет `экшен`, если только
        // какой-нибудь `мидлвар` дальше в цепочке не изменит его.

        return returnValue
    }
}
export default logger
