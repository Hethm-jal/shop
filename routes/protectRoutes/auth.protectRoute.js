const isAuth =(req,res,next)=>{
    if(req.session.userId){
        next()
    }else{
        res.redirect('/login')
    }
}
const notAuth =(req,res,next)=>{
    if(req.session.userId){
        res.redirect('/')
    }else{
        next()

    }
}
module.exports={
    isAuth:isAuth,
    notAuth:notAuth,

}