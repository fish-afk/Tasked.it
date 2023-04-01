const express = require('express');

const app = express();

app.get('/test', (req, res) => {
    return res.send("ok");
})

app.listen(3000, () => {
    console.log('running');
})

