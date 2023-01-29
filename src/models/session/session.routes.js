import { Router } from 'express';
import controller from './session.controller'
import { createValidator } from 'express-joi-validation';
import {validateLogin,validateRegister,validateForgetPassword, validateResetPassword} from './session.validator'
const validator = createValidator({ passError: true });

const router = new Router();
router.route('/login').post(validator.body(validateLogin, {
    joi: { convert: true, allowUnknown: false }
}),controller.login)

router.route('/register').post(validator.body(validateRegister, {
    joi: { convert: true, allowUnknown: false }
}),controller.register)

export default router

