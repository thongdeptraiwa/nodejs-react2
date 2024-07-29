const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ASM React vs Rest API',
      version: '1.0.0',
      description: "ASM là 1 app bán đồ ăn nhanh ( Bánh mì, Hamburger, Sandwich, Nước)",
    },
  },
  apis: ['./routes/*.js'], // Đường dẫn đến các file định nghĩa API
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

//link
//http://0.0.0.0:10000/api-docs/
//https://nodejs-react2.onrender.com/
