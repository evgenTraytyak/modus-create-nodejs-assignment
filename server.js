const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

router.get('/', (req, res) => {
  res.send('Hello Modus Create!');
});

app.listen(8888);
