require('dotenv').config()
const express = require('express');
const path = require('path');
const router = require('./routers/index');
require('./config/mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


app.listen(process.env.PORT, () => {
    console.log("Server was connected...");
})