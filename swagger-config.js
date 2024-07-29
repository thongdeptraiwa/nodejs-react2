const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ASM React vs Rest API',
      version: '1.0.0',
      description: "ASM là 1 app bán đồ ăn nhanh ( Bánh mì, Hamburger, Sandwich, Nước)",
    },
    servers: [
      {
        url: 'http://192.168.111.151:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Đường dẫn đến các file định nghĩa API
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

//link
//http://192.168.111.151:3000/api-docs/
