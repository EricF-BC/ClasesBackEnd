import ProdDao from "../persistence/daos/mongodb/product.dao.js";
import mongoose from 'mongoose';
import { initMongoDB } from '../persistence/daos/mongodb/database.js';
import { generateProduct } from '../utils/product.utils.js';
import { expect } from 'chai';

describe('Test unitarios de clase Products', () =>{
    let prodDao = null;
    let obj;
    let response;
    before(async()=>{
        initMongoDB();
        prodDao = new ProdDao();
        obj = generateProduct()
        response = await prodDao.create(obj);

    })

    after(() => {
        console.log('Finalizaron las pruebas de productos')
    })

    it('Debe crear un producto', async() =>{
        // afirmaciones
        expect(response).to.have.property('title');
        expect(response.title).to.be.equal(obj.title)
    });

    it('Debe Revisar los tipos de un producto', async() =>{
        //preparacion 
        // obj = generateProduct()
        // const response = prodDao.create(obj);
        expect(response.title).to.be.a('string');
        expect(response.description).to.be.a('string');
        expect(response.price).to.be.a('number');
        expect(response.stock).to.be.a('number');
    });

    it('Deberia Retornar todos los productos de la coleccion', async() =>{
        const products = await prodDao.getAll()
        expect(Array.isArray(products)).to.be.equal(true);
        expect(products.length > 0).to.be.equal(true);
    });
    it('Debe encontrar un producto por ID', async() =>{
        const prodNew = await prodDao.getById(response._id);
        const responseId = response._id.toString();
        const responseGetId = prodNew._id.toString();
        expect(responseGetId).to.equal(responseId);
    });
})