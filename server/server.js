const express = require('express');
const security = require('./middleware/Security');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(security.securityMiddleware);
app.use(cors({origin: "*"}));

const adminRouter = require("./routers/Admin_router");
const freelancerRouter = require("./routers/Freelancer_router");
const MessagesRouter = require("./routers/Messages_router");
const RolesRouter = require("./routers/Roles_router");
const TasksRouter = require("./routers/Tasks_router");
const ProjectsRouter = require("./routers/Projects_router");
const ClientsRouter = require("./routers/Clients_router");

app.use("/admins", adminRouter);
app.use("/freelancers", freelancerRouter);
app.use("/messages", MessagesRouter);
app.use("/roles", RolesRouter);
app.use("/tasks", TasksRouter);
app.use('/projects', ProjectsRouter);
app.use('/clients', ClientsRouter);

app.get('/test', (req, res) => {
    return res.send("server running");
})

app.listen(PORT || 4455, () => {
    console.log('\nserver running on port 4455');
})


/* This is a Node.js server application using the Express framework. It imports necessary modules such
as `express`, `cors`, and `dotenv`. It sets up middleware for security and parsing JSON data. It
defines routes for `/admins` and `/freelancers` using separate routers. It also defines a test route
at `/test`. Finally, it listens on a specified port or a default port of 4455. */