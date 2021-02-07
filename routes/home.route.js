const router =require('express').Router()
const homeController = require('../controolers/home.controller')
const authProtect = require('../routes/protectRoutes/auth.protectRoute')

router.get('/',homeController.getHome)

module.exports=router