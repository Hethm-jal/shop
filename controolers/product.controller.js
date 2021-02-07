const products= require('../models/products.models')

const getProduct=(req,res,next)=>{
    products.getProductsById(req.params.id).then((product)=>{
        res.render('product',{
            product:product,
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            pageTitle:'product detailes'
        })
    }).catch((err)=>{
        res.redirect('/error')
    })
}
module.exports = {
    getProduct:getProduct
}