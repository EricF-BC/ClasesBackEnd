import express from 'express';
import morgan from 'morgan';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import  ProductManager from './manager/ProductManager.js';

const productManager = new ProductManager('./products.json');
const app = express();

// app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/api/carts', cartRouter);
app.use('/products', productRouter);

const PORT = 8080



app.listen(PORT, ()=>console.log(`Server ok en puerto ${PORT}`));