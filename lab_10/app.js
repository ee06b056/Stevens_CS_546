const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const routeConfig = require('./routes');
const app = express();
const static = express.static(__dirname + '/public');

app.use('/static',static);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

routeConfig(app);

app.listen('3000', (req, res) => {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');

    if(process && process.send) process.send({done: true});
});