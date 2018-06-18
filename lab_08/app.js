const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const static = express.static(__dirname + '/public');

const pchecker = require('./utilities/palindromesChecker');


app.use('/static', static);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/doc/index.html'));
});

app.post('/result', (req, res) => {
    if (!req.body.text_to_test) {
        res.status(400).render('err',{statusCode:res.statusCode});
    } else {
        let obj = {
            isPalindromes: pchecker(req.body.text_to_test),
            rawText: req.body.text_to_test
        }
        res.render('result',obj);
    }
});


app.listen(3000, () => {
    console.log('server running on http://localhost:3000');
});
