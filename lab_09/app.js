const express = require('express');
const path = require('path');

const app = express();
const static = express.static(__dirname + '/public');

app.use('/static', static);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/doc/index.html'));
});

app.listen(3000, () => {
    console.log('server running on http://localhost:3000');
});

