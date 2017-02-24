const express = require('express');
const NHTSAService = require('../services/NHTSAService');

const router = express.Router();
const NHTSAApi = new NHTSAService();

router.get('/', (req, res) => {
  res.send('Hello Modus Create!');
});

router.get('/vehicles/:modelYear/:manufacturer/:model', (req, res) => {
  const params = req.params;
  const queries = req.query;

  NHTSAApi.getData(params, queries).then(data => res.json(data));
});

router.post('/vehicles', (req, res) => {
  const params = req.body;

  NHTSAApi.getData(params).then(data => res.json(data));
});

module.exports = router;
