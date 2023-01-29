import constants from './constants'
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import md5 from "md5";



export default {
    isValidMongoId(id) {
        return ObjectId.isValid(id)
    },
    generateMarketCid: async function (db) {
        const marketCount = await marketFacade.count({}) || 0;
        return 1111 + marketCount
    },
    getAccuracyPercentage(value){
        if(value<50) return 100
        else if(value<100) return 80
        else if(value<150) return 60
        else if(value<200) return 40
        else if(value<250) return 20
        else return 0
        

    },
    getTimeStamps: function () {
        return {
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    },
    updateTimeStamp: function () {
        return {
            updatedAt: Date.now()
        }
    },
    hashPassword: async (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    comparePassword: async (hashPassword, userPassword) => {
        return await bcrypt.compareSync(userPassword, hashPassword)
    },
    generateToken: (params, tokenType = 'access') => {
        const secretKey =  constants.ACCESS_TOKEN_SECRET_KEY;
        return jwt.sign(params, secretKey);
    },
    verifyToken: (token, tokenType = 'access') => new Promise((resolve, reject) => {
        const secretKey =  constants.ACCESS_TOKEN_SECRET_KEY;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded);
        });
    }),
    getUserToken: function (entry) {
        const {_id} = entry
        const token = jwt.sign({userId: md5(_id), date: Date.now()}, constants.JWT_PRIVATE_KEY);
        return token;
    },
    getFindParams: function(options = {}, defaultSortOn = 'createdAt') {
        let {sort = null, page = 1, limit = '50'} = options;

        if (!Number.isInteger(limit)) limit = parseInt(limit);

        const skip = (page - 1) * limit;
        const sortBy = sort ? (sort[0] == '-' ? -1 : 1) : -1
        const sortOn = sort ? (sort[0] == '-' ? sort.slice(1) : sort) : defaultSortOn

        return {
            sort: {[sortOn]: sortBy},
            limit,
            skip
        }
    },
    getRandomString: function () {
        return (Math.random().toString(36) + '0000000000').slice(2, 10 + 2)
    },
}

