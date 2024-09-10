const express = require('express')
const router = express.Router()

const isAuthenticated = (req, res, next) => {
  if (req.headers['access-key'] === 'secret') {
    next()
    return
  }
  res.status(403).send('Foribdden')
}

router.get('/', isAuthenticated, (req, res) => {
  res.send('list of articles')
})

router.get('/:id', isAuthenticated, (req, res) => {
  res.send(`Article ${req.params.id} details`)
})

module.exports = router;
