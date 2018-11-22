
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");

//routes

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers", {beers: beers}) //You should call the render method after getting the beers
  })
  .catch(e => next(e));
});

app.get('/random-beers', (req, res,next) => {
  punkAPI.getBeers()
    .then(beers => {
      let random = beers[Math.floor(Math.random() * beers.length)];
      res.render('random-beers', {beers: random})
    })
    .catch(e => next(e));
});

app.listen(3000, () => {
  console.log('listening at 3000');
});