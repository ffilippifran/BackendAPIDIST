const swaggerAutogen = require('swagger-autogen')();

const doc = {
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
        tags: [
            "User",
            "Client",
            "Admin"
        ],
     // by default: empty object (OpenAPI 3.x)
};

const outputFile = './swagger-output.json';

const endpointsFiles = ['./app'];
/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app')           // Your project's root file
})