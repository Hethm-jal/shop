    const isAdmin =(req,res,next)=>{
        if(req.session.isAdmin) next()
        else{
            res.redirect('/notadmin') 
        }
    }
    module.exports ={
        isAdmin:isAdmin
    }