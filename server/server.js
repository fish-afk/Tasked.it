const express = require('express');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const adminRouter = require("./routers/Admin_router");
const freelancerRouter = require("./routers/Freelancer_router");

app.use("/admins", adminRouter);
app.use("/freelancers", freelancerRouter);


app.get('/test', (req, res) => {
    return res.send("ok");
})

app.listen(PORT || 4455, () => {
    console.log('\nserver running on port 4455');
})

