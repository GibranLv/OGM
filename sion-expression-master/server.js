const express = require('express');
const bodyParser = require('body-parser');
const math = require('mathjs');
const _ = require('underscore');

const app = express();
const port = 3015;

app.use(bodyParser.json())

app.post('/expression', (req, res) => {
  let json = req.body;

  if (!json) {
    res.status(200).json({ doc: false });
    return;
  }

  let expression = json.expression;
  if (!_.isString(expression)) {
    res.status(200).json({ doc: false });
    return;
  }

  let value = math.evaluate(expression);

  let o = false;
  try {
    o = JSON.parse(value);
  } catch(e) {
    o = false;
  }

  if (_.isBoolean(o)) {
    res.status(200).json({ doc: o });
  } else {
    res.status(200).json({ doc: false });
  }

  return;
});

app.post('/expression-value', (req, res) => {
  //let start = Date.now();
  let json = req.body;

  if (!json) {
    res.status(200).json({ doc: false });
    return;
  }

  let expression = json.expression;
  if (!_.isString(expression)) {
    res.status(200).json({ doc: false });
    return;
  }

  let value = math.evaluate(expression);

  let o = false;
  try {
    o = JSON.parse(value);
  } catch (e) {
    o = false;
  }

  res.status(200).json({ doc: o });
  return;
});

app.listen(port, () => console.log(`SION-expression: Running in ${port}`))
