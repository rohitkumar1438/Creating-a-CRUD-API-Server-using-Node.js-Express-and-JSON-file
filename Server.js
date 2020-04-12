const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const path = require('path');
const app = express();
  
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'Test';
app.set('port', PORT);
app.set('env', NODE_ENV);


app.get('/', (request, response) => {
    return response.send('Received a GET HTTP method');
});

app.post('/', (request, response) => {
    return response.send('Received a POST HTTP method');
});

app.put('/', (request, response) => {
    return response.send('Received a PUT HTTP method');
});
  
app.delete('/', (request, response) => {
    return response.send('Received a DELETE HTTP method');
});

// express.json(): Parses the text as JSON and exposes the resulting object on req.body.
// express.urlencoded(): Parses the text as URL encoded data (which is how browsers tend to send 
// form data from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body.
app.use(logger('tiny'));
// app.use('/', require(path.join(__dirname, './data')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/users', (request, response) => {
//     return response.send(Object.values(users));
//   });

// app.get('/users/:userId', (request, response) => {
//     return response.send(users[request.params.userId]);
// });

// app.post('/users/:userId', (request, response) => {
//     // console.log(request)
//     id = request.params.userId
//     // console.log('id:', id)
//     username = request.body.username
//     users[id].username = username
//     console.log('users[id].username:', request.body.username)
//     console.log('username:', username)
//     return response.send(users[id]);
// });

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

// app.listen(8080, () => {
//   console.log('Express Running on localhost:8080');
// });

app.listen(PORT, () => {
    console.log(`Express Running on on Port ${app.get(
        'port'
      )} | Environment : ${app.get('env')}`
    );
  });
