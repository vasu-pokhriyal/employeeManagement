import dbClient from '../../connection/mongodb'
import helpers from '../../utils/helpers'
import user from './user.model'

export default {
   
    findOne: async function (filter) {
        return await user.findOne(filter)
    },
    create: async function (data) {
        return await user.create(data)
        
    },
   
    update: async function (userId,updateEntry) {
       
        return await user.findOneAndUpdate(userId, updateEntry, {returnOriginal: false})
    },
    find: async function (filter, options={}) {
        const {sort, limit, skip} = helpers.getFindParams(options);
        return user.find(filter).sort(sort).skip(skip).limit(limit)
    },
}