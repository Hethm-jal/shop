const validationResult = require("express-validator").validationResult;
const productModel = require('../models/products.models')

const getAdd =(req,res,next)=>{
    res.render('add-product',{
        validationError:req.flash('validationError'),
        isUser:true,
        isAdmin:true,
        pageTitle:'Add Product'
    })
}

const postAdd =(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        req.body.image = req.file.filename
        productModel.addNewProduct(req.body).then(()=>{
            req.flash('added',true)
            res.redirect('/admin/add')
        }).catch((err)=>{
            //next(err)
            res.redirect('/error')
        })
    } else{
        req.flash('validationError',validationResult(req).array())
        res.redirect('/admin/add')
    }

    
}
module.exports ={
    getAdd:getAdd,
    postAdd:postAdd,
}