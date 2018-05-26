const Shortener = require('../models/index')

module.exports = {
  createShortener: function (req, res) {
    if(req.body.url){
      let regexp = /^[0-9a-zA-Z_]{6}$/
      // (req.body.shortcode.match(regexp))
      Shortener.findOne({shortcode: req.params.shortcode})
      .then(short => {
        if(short){
          res.status(409).json("The desired shortcode is already in use")
        } else {
          let short = new Shortener()
          short.url = req.body.url
          short.shortcode = req.body.shortcode
          short.startDate = Date.now()
          short.redirectCount = 0
          short.save()
          .then(data => {
            res.status(201).json({
              shortcode: data
            })
          })
          .catch(err => {
            res.status(500).json(err)
          })
        }
      })
    } else {
      res.status(400).json("url is not present")
    }
  },
  getShortcode: function (req, res) {
    Shortener.findOne({shortcode: req.params.shortcode})
    .then(short => {
      res.status(302).json({
        Location: short.url
      })
    })
    .catch(err => {
      res.status(404).json("The shortcode cannot be found in system")
    })
  },
  getStats: function (req, res) {
    Shortener.findOne({shortcode: req.params.shortcode})
    .then(short => {
      short.lastSeenDate = Date.now()
      short.redirectCount += 1
      short.save()
      .then(result => {
        res.status(200).json(result)
      })
    })
    .catch(err => {
      res.status(404).json("The shortcode cannot be found in the system")
    })
  }
}