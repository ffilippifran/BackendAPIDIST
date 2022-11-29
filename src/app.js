const express = require('express');
const swaggerUI = require('swagger-ui-express');
const _connect = require('./db/_connect');
require('dotenv').config();
const {isAdmin, isOwner, isAuthenticated} = require('./middlewares/index');

//connection with MongoDB
_connect()

const app = express();
app.use(express.json());
const swaggerFile = require('../swagger-output.json');



app.use('/api/v1.1/auth', require('./routes/authRouter'));
app.use('/api/v1.1/restaurant', require('./routes/restaurantRouter'));
app.use('/api/v1.1/review', require('./routes/reviewRouter'));
app.use('/api/v1.1/account', require('./routes/userRouter'));
app.use('/api/v1.1/dish', require('./routes/dishRouter'));

var options = {
    swaggerOptions: {
      info:{
        version: "1.0.0",
        title: "Documentación API - Aplicaciones Distribuidas",
        Description: "Documentación para consumir la API",
    },
        contact: {
            name: "Equipo 5",
            url: "https://www.linkedin.com/in/uade"
        },
        host: "localhost:3000",
        basePath: "/",
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "access_token", description: ""}, value: "Bearer <JWT>"} }
    },
    apis: ['app.js']
  };
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile,options))


app.listen(3000, () => console.log(`Aplicación escuchando a través del ${process.env.port}`));