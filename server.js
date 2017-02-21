const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

router.get('/', (req, res) => {
  res.send('Hello Modus Create!');
});

app.listen(8888);
