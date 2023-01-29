
import userFacade from "../user/user.facade";
import Message from "../../utils/messages";
import helpers from "../../utils/helpers";

export default {

    register: async function (entry) {
        try{
        const {password, email} = entry;
        let checkUser = await userFacade.findOne({
            email,isDeleted:false
        })

        if(checkUser) throw new Error(Message.userAlreadyExists)
        let hashPassword = await helpers.hashPassword(password)
      let user =  await userFacade.create({
            email:email,
            password:hashPassword,
            role:'ADMIN'
        });

        return {
            userProfile: {
            email:user.email  
            },
            token: {
                access: helpers.generateToken({id:user._id}),
                type: 'Bearer',
            },
        };
    }catch(error){
        console.log(error)
    }
     
    },
    login: async function (entry) {
        const {password, email} = entry;

        let userData = await userFacade.findOne({email: email,isDeleted:false});
        if (!userData) throw new Error(Message.userNotExists)
        let compare = await helpers.comparePassword(userData.password, password);
        if (!compare) throw new Error(Message.passwordNotMatched)
        return {
            userProfile: {
            email:userData.email  
            },
            token: {
                access: helpers.generateToken({id:userData._id}),
                type: 'Bearer',
            },
        };
        // let token = await helpers.getUserToken(userData)
        // await sessionFacade.create({ cid: parseInt(marketId),userId:userData["_id"],loginData: {token, ...helpers.getTimeStamps()}})
        // return token;
    },
    forgetPassword: async (entry) => {

        const {marketId,email} = entry;


        const market = await marketFacade.findOne({
            cid: marketId
        });
        if (!market) throw new Error(Message.marketNotExists)
        let userData = await userFacade.findOne(marketId, {email});
        if (!userData) throw new Error(Message.userNotExists)

        let resetPasswordMailToken = await helpers.getRandomString();
        let updatedData = await userFacade.findOneAndUpdate(marketId,{email, isDeleted: false,}, {resetPasswordMailToken});
        if (!updatedData)  throw new Error(Message.userNotExists)
        await mailClient.resetPassword({email, resetPasswordMailToken, marketId, userName:userData['name']});

        return;

    },
    resetPassword: async (entry) => {

        const {marketId,email, password, resetPasswordMailToken} = entry;

        const market = await marketFacade.findOne({
            cid: marketId
        });
        if (!market) throw new Error(Message.marketNotExists)
        let userData = await userFacade.findOne(marketId, {email});
        if (!userData) throw new Error(Message.userNotExists)
        if(userData['resetPasswordMailToken']!==resetPasswordMailToken) throw new Error(Message.userNotExists)
        let hashPassword = await helpers.hashPassword(password);
        let updatedData = await userFacade.findOneAndUpdate(marketId,{email, isDeleted: false,}, {password:hashPassword,resetPasswordMailToken:null});
        if (!updatedData)  throw new Error(Message.userNotExists)
    },
}