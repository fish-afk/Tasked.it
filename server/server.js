const express = require('express');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.get('/test', (req, res) => {
    return res.send("ok");
})

app.listen(PORT || 4455, () => {
    console.log('running');
})

