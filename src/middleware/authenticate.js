import helper from "../utils/helpers"
import {failAction} from '../utils/response'

export default {

    isAuthorized: async function (req, res, next) {

        try {
            const authHeader = req.headers.authorization;
            console.log("auth token",req.headers.authorization)
            const token = authHeader && authHeader.split(' ')[1];
            if (!token || token === '') {
                return authorizationError(res, message.jwt.accessFailed[ln]);
            }
            let result = await helper.verifyToken(token);
            console.log(result)
            // req.user.role = CONSTANTS.getKeyByValue(CONSTANTS.users.type, req.user.type);

             return next();
        } catch (e) {
            return  res.status(401).json(failAction('invalid token', 500));
        }
    }}
// const isAuthorized = async (req, res, next) => {
//    
// };