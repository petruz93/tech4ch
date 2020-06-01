const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./utility/dbConf');
// const visitController = require('./controllers/visitController');
const visitorController = require('./controllers/visitorController');
const poiController = require('./controllers/poiController');
const allDataController = require('./controllers/allDataController');
const errorHandler = require('./controllers/errorHandler');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// set moongoose connection
db.initDb();

// set middlewares
app.get('/', (req, res) => {
  res.send({ message: 'hello world!' });
});
app.use(visitorController);
app.use(poiController);
app.use(allDataController);
// app.use(visitController);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  const port = process.env.PORT || 3000;
  console.log(`Server is listening on port ${port}...`);
});
