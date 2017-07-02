const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const routes = require('./routes/router');
const path = require('path');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
// app.set('layout','layout');

app.use('public', express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(expressValidator());
app.use(morgan('dev'));
app.use(routes);


app.listen(3200, function(){
  console.log('App running on http://localhost:3200');
});
