const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const router = require('./routes');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(8888);
