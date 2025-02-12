const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const path = require('path');
const app = express();
  
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'Test';
app.set('port', PORT);
app.set('env', NODE_ENV);


app.use(logger('tiny'));
// app.use('/', require(path.join(__dirname, './data')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users',require('./route/user.js'))

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status);
    res.json({
      error: {
        message: err.message,
      },
    });
});


app.listen(PORT, () => {
    console.log(`Express Running on on Port ${app.get(
        'port'
      )} | Environment : ${app.get('env')}`
    );
  });
