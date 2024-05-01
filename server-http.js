// const http = require('http');
//module.exports = http

import http from 'http';
import { products } from './products.js'

const server = http.createServer((req, res)=>{
    // request ---> info que viene del cliente
    // response --> Respuesta

    if(req.url === '/home'){
        res.end('Home-')
    }
    console.log(req.url);
    if(req.url === '/products'){
         res.end(JSON.stringify(products))
    }
});

server.listen(8080, ()=> {
    console.log('Server Ok en puerto 8080');
})