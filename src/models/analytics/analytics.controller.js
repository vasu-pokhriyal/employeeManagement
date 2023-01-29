import service from './analytics.service'
import {successAction, failAction} from '../../utils/response'
import Message from "../../utils/messages";

export default {
    overallPerformance: async (req, res, next) => {
        try {
            const data = await service.overallPerformance();
             res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            res.status(400).json(failAction(error.message));
        }
    },
    projectPerformance: async (req, res, next) => {
        try {
            const {params: {id = null} = {}} = req
            const data = await service.projectPerformance(id);
            res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            res.status(400).json(failAction(error.message));
        }
    },
    overallAccuracy: async (req, res, next) => {
        try {
            const {params: {id = null} = {}, userInfo = {}} = req;
            const data = await service.overallAccuracy(id);
            res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            res.status(400).json(failAction(error.message));
        }
    },
    projectAccuracy: async (req, res, next) => {
        try {
            const {params: {id = null} = {}, body} = req;
            const data = await service.projectAccuracy(id,body);
            res.status(200).json(successAction(data, Message.success));
        } catch (error) {
            res.status(400).json(failAction(error.message));
        }
    },

}
