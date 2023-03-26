const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

//para usar json en response hay que usar un middleware

app.use(express.json());
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.listen(port, () => {
  console.log('Mi port' + port);
});
routerApi(app);

// los middleware se ejecutan el orden en el que se implementan
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
