const express = require('express');
const app = express();
const articles = require('./article')
const authentication = require('./auth')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loggerMiddleware = (req, res, next) => {
  console.log(`the method: ${req.method} ${req.url}`);
  next();
}

const timestampMiddleware = (req, res, next) => {
  req.timestamp = new Date();
  next();
}

const authMiddleware = (req, res, next) => {
  if (!req.headers['x-custom-header']) {
    const err = new Error('Custom Header not present error')
    next(err)
  } else {
    next()
  }
}

app.get('/timestamp', loggerMiddleware, authMiddleware, timestampMiddleware, (req, res) => {
  res.send(`
    Timestamp: ${req.timestamp}
    Custom Header: ${req.headers['x-custom-header']}
  `);
})

app.use('/articles', articles)
app.use('/', authentication)

app.use((req, res, next) => {
  res.status(404).send(`Page ${req.url} Not Found`)
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening: ${PORT}`))
