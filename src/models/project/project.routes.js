import { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import controller from './project.controller'
import {validateCreate,validateUpdate} from './project.validtor'
import authenticate from '../../middleware/authenticate'


const validator = createValidator({ passError: true });

const router = new Router();
router.route('/')
.post( validator.body(validateCreate, {
    joi: { convert: true, allowUnknown: false }
}),controller.create)
.get(controller.find)


router.route('/:id')
  .get(controller.findOne)
  .put(validator.body(validateUpdate, {
    joi: { convert: true, allowUnknown: false }
}),controller.update);


// router.route('/checkMarket').post( validator.body(validateCheckMarket, {
//     joi: { convert: true, allowUnknown: false }
// }),controller.checkMarket);

// router.route('/profile-view').get(authenticate, controller.profileView);



export default router