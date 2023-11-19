//con esto nos traemos express

const express = require('express');
const cors = require('cors');
//const { faker } = require('@faker-js/faker');
const app = express();
const port = 3000;

app.use(express.json());
//asi funciona libreria cors
const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middleware/errorHandler');

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//get por parametros query
app.get('users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({ limit, offset });
  } else {
    res.send('no hay paarametros');
  }
});

//utilizamos el puerto
app.listen(port, () => {
  console.log('My port: ' + port);
});
