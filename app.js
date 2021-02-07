var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var SessionStore =require('connect-mongodb-session')(session)
var flash = require('connect-flash')
/////////////////////////////////////////////////////
const homeRouter =require('./routes/home.route')
const productRouter =require('./routes/product.route')
const authRouter =require('./routes/auth.route')
const cartRouter = require('./routes/cart.route')
const adminRouter =require('./routes/admin.route')
/////////////////////////////////////////////////////////
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'image')));

app.use(flash())
const STORE = SessionStore({
  uri:'mongodb+srv://hethm:hethm@cluster0.aikln.mongodb.net/online-shop?retryWrites=true&w=majority',
  collection:'sessions',
})

app.use(session({
  secret:'this is my secret for you and is it you are and .....',
  saveUninitialized:false,
  store:STORE,
}))
///////////////////////////////////////////////////////////////////
app.use(homeRouter)
app.use(productRouter)
app.use(authRouter)
app.use(cartRouter)
app.use(adminRouter)
app.get('/error',(req,res,next)=>{
  res.status(500),
  res.render('error',{
    isUser:req.session.userId,
    isAdmin:req.session.isAdmin,
})
})
app.use('/notadmin',(req,res,next)=>{
  res.status(403),
    res.render('notadmin',{isUser:req.session.userId,
      isAdmin:false,
  })
})

app.use((error,req,res,next)=>{
  res.redirect('/error')
})
/////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
