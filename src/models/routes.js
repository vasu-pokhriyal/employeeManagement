import { Router } from 'express';
import auth from '../middleware/authenticate'


import userRouter from './user/user.routes'
import projectRouter from './project/project.routes'
import taskRouter from './projectTask/projectTask.routes'
import analyticsRouter from './analytics/analytics.routes'
import sessionRouter from './session/session.routes'


const router = Router();

router.use('/user',auth.isAuthorized,userRouter)
router.use('/project',auth.isAuthorized, projectRouter)
router.use('/task',auth.isAuthorized,taskRouter)
router.use('/analytics',auth.isAuthorized,analyticsRouter)
router.use('/session',sessionRouter)
// router.use('/test',function(req, res, next){
//     return res.status(200).json({
//         statusCode: 200,
//         data:{},
//         message: "hello this is vasu"
//     });
// })


export default router