import {ObjectId} from 'mongodb'
import facade from './projectTask.facade'


export default {
    create: async function (data) {
        return await facade.create(
            {
               
                ...data,
            });
    },
    find: async function (data) {
       let filter={isDeleted: false,projectId:ObjectId(data.projectId)};
        return await facade.find(filter,data)
    },
    findOne: async function (id) {
        let filter={isDeleted: false, _id:ObjectId(id)}
        return await facade.findOne(filter)
    },
    update: async function (Id,updateInfo) {
       
        return facade.update({_id:ObjectId(Id)},{"$set":{...updateInfo, updatedAt:Date.now()}})
    }
}