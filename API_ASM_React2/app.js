var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//config mongoose
const mongoose = require("mongoose");
require("./models/role");
require("./models/tai_khoan");
require("./models/loai");
require("./models/san_pham");
//require("./models/gio_hang");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//mogo
var roleRouter = require('./routes/role_routes');
var tai_khoanRouter = require('./routes/tai_khoan_routes');
var loaiRouter = require('./routes/loai_routes');
var san_phamRouter = require('./routes/san_pham_routes');
//var gio_hangRouter = require('./routes/gio_hangRouter');

var app = express();
//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect database
mongoose.connect('mongodb+srv://thong442001:bgGidJdklTccFnR2@thong.3g98kdm.mongodb.net/react2')//link connect vs mongobd
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//mogo
app.use('/role', roleRouter);
app.use('/tai_khoan', tai_khoanRouter);
app.use('/loai', loaiRouter);
app.use('/san_pham', san_phamRouter);
//app.use('/gio_hang', gio_hangRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
