const router = require('express').Router()
const bodyParser =require('body-parser')
const authController = require('../controolers/auth.controller')
const authProtect = require('../routes/protectRoutes/auth.protectRoute')
const check =require('express-validator').check

router.get('/signup',authProtect.notAuth,authController.getSignup)

router.post('/signup',authProtect.notAuth,
            bodyParser.urlencoded({extended:true}),
            check('username').not().isEmpty().withMessage('username not be empty'),
            check('email').not().isEmpty().withMessage('email not be empty').isEmail().withMessage('invalid format'),
            check('password').isLength(6).withMessage('Password must be more than 6 characters long'),
            check('confirmpassword').custom((value,{req})=>{
                if(value==req.body.password){
                    return true;
                }else{
                    throw('passwords not equal')
                }
            }),
            authController.postSignup
    )

router.get('/login',authProtect.notAuth,authController.getLogin)

router.post('/login',authProtect.notAuth,
check('email').not().isEmpty().withMessage('email not be empty').isEmail().withMessage('invalid format'),
check('password').isLength(6).withMessage('password must be more thgan 6 character'),
authController.postLogin)

router.post('/logout',authProtect.isAuth,authController.logout)

 module.exports =router
