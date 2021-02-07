const products= require('../models/products.models')

const getHome =function(req,res,next){
    console.log(req.session.userId)
    //get name ="category" from index.ejs
    let category = req.query.category
    let validateCategory =['clothes','phones','computer']
    let productsPromise
    if (category && validateCategory.includes(category)) 
          {
     productsPromise= products.getProductsByCategory(category)
          }
       else {
           productsPromise =products.getAllProducts()
             }
             
           productsPromise.then(product=>{
           res.render('index',{
               products:product,
               isUser:req.session.userId,
               isAdmin:req.session.isAdmin,
               validationError:req.flash('validationError')[0],
               pageTitle:'Home'
        })
       })      
}
module.exports ={
    getHome:getHome
}