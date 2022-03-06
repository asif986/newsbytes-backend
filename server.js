const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ShortUrl = require('./models/shortUrl')
const cors = require('cors')
const app = express();

//mongodb://localhost/urlShortener
mongoose.connect('mongodb+srv://gh0oDGGJbG8QbDfD:gh0oDGGJbG8QbDfD@testing.wyqfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(r => {
  // console.log('success');
}).catch(e => {
  // console.log(e);
})

// app.set('view engine', 'ejs')
app.use(cors());
app.use(bodyParser.json());


app.get('/link', async (req, res) => {
  const shortUrls = await ShortUrl.find().then(res1 => {

    res.status(200).json({
      message: 'data fetch successfully',
      succes: 1,
      data: res1
    });
  }).catch(e => {
    res.status(200).json({
      message: e,
      succes: 0,
      data: ''
    });
  })
  // res.render('index', { shortUrls: shortUrls })
})

app.post('/link', async (req, res) => {
  // console.log(req.body)
  await ShortUrl.create({ full: req.body.full }).then(() => {
    res.status(201).json({
      message: "Url added successfully",
      success: 1,
      data: []
    });
  }).catch(() => {
    res.status(500).json({
      message: "Something went to wrong",
      success: 0,
      data: []
    });
  })
})

app.put('/link', async (req, res) => {
  console.log(req.body);
  const shortUrl = await ShortUrl.findOne({ short: req.body.shortUrl })

  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save().then(() => {
    res.status(200).json({
      message: "",
      success: 1,
      data: []
    })
  })

})

app.listen(process.env.PORT || 5000);