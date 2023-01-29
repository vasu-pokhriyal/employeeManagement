import service from './session.service'
import {failAction, successAction} from "../../utils/response";
import Message from "../../utils/messages";

export default {
    register: async (req, res, next) => {
        try {
            const data = await service.register(req.body);
            res.setHeader("x-auth-token", data)
            res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            res.status(400).json(failAction(error.message));
        }
    },
    login: async (req, res, next) => {
        try {
            const data = await service.login(req.body);
            res.setHeader("x-auth-token", data)
            res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            console.log(error)
            res.status(400).json(failAction(error.message));
        }
    },
    
}
