import service from './projectTask.service'
import {successAction, failAction} from '../../utils/response'
import Message from "../../utils/messages";

export default {
    create: async (req, res, next) => {
        try {
            const data = await service.create(req.body);
             res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            res.status(400).json(failAction(error.message));
        }
    },
    find: async (req, res, next) => {
        try {
            const data = await service.find(req.query);
            res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            res.status(400).json(failAction(error.message));
        }
    },
    findOne: async (req, res, next) => {
        try {
            const {params: {id = null} = {}, userInfo = {}} = req;
            const data = await service.findOne(id);
            res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            res.status(400).json(failAction(error.message));
        }
    },
    update: async (req, res, next) => {
        try {
            const {params: {id = null} = {}, body} = req;
            const data = await service.update(id,body);
            res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            res.status(400).json(failAction(error.message));
        }
    },

}
