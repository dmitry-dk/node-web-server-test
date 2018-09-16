const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine', 'hbs');

hbs.registerHelper('getCureentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase()
});

app.use((req, res, next) => {
  var log = `${new Date().toString()} ${req.method} ${req.url}`;
  fs.appendFile('server.log', log+'\n', (err) => {
    if(err){
      console.log(`FILE I/O Error: ${err}`);
    }
  });
  console.log(log);
  next();
});

// app.use((reg, res, next) => {
//   res.render('maint.hbs')
// });

app.use(express.static(__dirname+'/public'))


app.get('/',(req, res) => {
  res.render('home.hbs', {
    pageTitle:'Home Page',
    mainMessage:'Hello friends, you are visiting sample express home page'
    //currentYear: new Date().getFullYear()
  });});

app.get('/bad',(req, res) => {
  res.send({
    errorCode: 404,
    errorMessage:'Request is not valid'
  });

});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle:'About Page'
//    currentYear: new Date().getFullYear()
  });
});


app.listen(port, () => {
  console.log(`Serevr is up on port ${port}`);
});
