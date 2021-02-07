const router = require('express').Router()
const productController =require('../controolers/product.controller')

router.get('/product',(req,res,next)=>{
    res.redirect('/')
})
////////////////////////////////////////////
router.get('/product/:id',productController.getProduct)

module.exports = router