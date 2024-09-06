import app from '../app.js';
import request from 'supertest';
import { generateProduct } from '../utils/product.utils.js';
import config from "../config.js";
import CartDao from "../persistence/daos/mongodb/cart.dao.js";

describe('Conjunto de pruebas de API Carts', () =>{
    let cartDao = null;
    let sessionCookie;
    beforeAll(async()=>{
        console.log("Se inicia el proceso de testing")
    })

    // test('[GET] /carts/', async() => {

    // })

    test('[POST] /users/loginpost/', async() => {
        const userAdmin = {
            email: config.USER_ADMIN,
            password: config.PASSWORD_ADMIN
        }
        const response = await request(app).post('/users/loginpost').send(userAdmin);
        expect(response.status).toEqual(200);
        expect(response.request._data.email).toEqual(userAdmin.email);

        // Guarda la cookie de sesión para futuras peticiones
        sessionCookie = response.headers['set-cookie'];

        /* ------------------------------------ - ----------------------------------- */
        const userInvalid = {
            email: "TEST@TESTING.com",
            password: "TESTPASSWORD"
        }
        const responseInvalid = await request(app).post('/users/loginpost').send(userInvalid);
        expect(responseInvalid.status).toEqual(401);

    })

    test("[POST] /users/logout", async function () {
        const response = await request(app).post("/users/logout");
        expect(response.status).toEqual(302);
      });

    test('[POST] /products/', async() => {
        const body = generateProduct();
        const response = await request(app)
            .post('/products')
            .set('Cookie', sessionCookie)
            .send(body);
        expect(response.statusCode).toEqual(200);
    })

    test('[GET] /products/', async() => {
        const response = await request(app).get('/products').send();
        const statusCode = response.statusCode;
        expect(statusCode).toEqual(200);
        expect(response.body.data).toBeInstanceOf(Array);
    })

    test('[GET] /products/:id', async()=>{
        const body = generateProduct();
        const response = await request(app)
            .post('/products')
            .set('Cookie', sessionCookie)
            .send(body);
        const { _id } = response._body.data;
        const responseGetById = await request(app).get(`/products/${_id}`);
        expect(responseGetById.statusCode).toEqual(200);
/* ------------------------------------ - ----------------------------------- */
        const idFalse = '507f191e810c19729de860ea';
        const responseGetByIdNotFound = await request(app).get(`/products/${idFalse}`);
        expect(responseGetByIdNotFound.statusCode).toEqual(500);
      })

    // test('[POST] /carts/product/:id', async ()=> {
    //     const userAdmin = {
    //         email: "testcart@gmail.com",
    //         password: "1234"
    //     }

    //     const responseUser = await request(app).post('/users/loginpost').send(userAdmin);
    //     const sessionCookieCart = responseUser.headers['set-cookie'];

    //     const body = generateProduct();
    //     const createProduct = await request(app)
    //         .post('/products')
    //         .set('Cookie', sessionCookie)
    //         .send(body);
    //     const { _id } = createProduct._body.data;

    //     const response = await request(app)
    //         .post(`/carts/product/${_id}`)
    //         .set('Cookie', sessionCookieCart)
    //         .send();
        
    //     console.log(response.status)

    // });

    test('[GET] /carts/', async ()=> {
        const response = await request(app)
            .get(`/carts/`)
        
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('[DELETE] /carts/clear/:id', async ()=> {
        cartDao = new CartDao();
        const cart = await cartDao.create()
        const { id } = cart;
        const response = await request(app)
            .delete(`/carts/clear/${id}`)
        
        expect(response.statusCode).toEqual(200);
    });

})
