import {ObjectId} from 'mongodb'
import facade from './user.facade'


export default {
    create: async function (data) {
        return await facade.create(data);
    },
    find: async function (options) {
       let filter={isDeleted: false};
        return await facade.find(filter,options)
    },
    findOne: async function (id) {
        let filter={isDeleted: false, _id:ObjectId(id)}
        return await facade.findOne(filter)
    },
    update: async function (Id,updateInfo) {
       
        return facade.update({_id:ObjectId(Id)},{"$set":{...updateInfo, updatedAt:Date.now()}})
    }
}