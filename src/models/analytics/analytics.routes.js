import { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import controller from './analytics.controller'
// import {validateCreate} from './project.validtor'
// import authenticate from '../../middleware/authenticate'


const validator = createValidator({ passError: true });

const router = new Router();
router.route('/overall-performance')
.get(controller.overallPerformance)

router.route('/project-performance/:id')
.get(controller.projectPerformance)

router.route('/overall-accuracy')
.get(controller.overallAccuracy)

router.route('/project-accuracy/:id')
.get(controller.projectAccuracy)

export default router