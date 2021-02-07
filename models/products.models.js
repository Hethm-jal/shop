const mongoose =require('mongoose')
const db_url ='mongodb+srv://hethm:hethm@cluster0.aikln.mongodb.net/online-shop?retryWrites=true&w=majority'
const productSchema =mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    description:String,
    category:String,
})
const product= mongoose.model('product',productSchema)

var getAllProducts=()=>{
   return new Promise((resolve,reject)=>{
    mongoose.connect(db_url,{ useNewUrlParser: true }).then(()=>{
        return  product.find({})
                    //products is result of product.find({})
          }).then(products=>{
              mongoose.disconnect()
              resolve(products)
      }).catch(err=>reject(err))
   })
}



var getProductsByCategory=(category)=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(db_url,{ useNewUrlParser: true }).then(()=>{
         return  product.find({category:category})
           }).then(products=>{
               mongoose.disconnect()
               resolve(products)
       }).catch(err=>reject(err))
    })
 }

 var getProductsById=(id)=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(db_url,{ useNewUrlParser: true }).then(()=>{
         return  product.findById(id)
           }).then(products=>{
               mongoose.disconnect()
               resolve(products)
       }).catch(err=>reject(err))
    })
 }
 var addNewProduct = (data)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(db_url).then(()=>{
            let newProduct =new product(data)
            return newProduct.save()
        }).then((products)=>{
            resolve(products)
            mongoose.disconnect()
        }).catch((err)=>{
            reject(err)
            mongoose.disconnect()
        })
    })
 }

module.exports ={
    getAllProducts:getAllProducts,
    getProductsByCategory:getProductsByCategory,
    getProductsById:getProductsById,
    addNewProduct:addNewProduct,
}