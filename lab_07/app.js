const express = require('express');
const app = express();
const configRoute = require('./routes');

configRoute(app);

app.listen(3000, () => {
    console.log('server started!');
});
