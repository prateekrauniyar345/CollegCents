// config/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Campus Cents API',
      version: '1.0.0',
      description: 'REST API documentation for the Campus Cents backend',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server',
      },
    ],


    // This controls the order shown in Swagger UI
    tags: [
      {
        name: 'Auth',
        description: 'Authentication API',
      },
      {
        name: 'Users',
        description: 'User management API',
      },
    ],


    
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default specs;