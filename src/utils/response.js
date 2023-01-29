import messages from "./messages"
export const successAction = (data, message = 'OK') => {
    return ({statusCode: 200, data, message});
}

export const failAction = (message = 'Fail', statusCode = 400) => {
    return ({statusCode, data: null, message});
}

export const invalidToken = (message = 'wrong token', statusCode = 400) => {
    return ({statusCode, data: null, message});
}