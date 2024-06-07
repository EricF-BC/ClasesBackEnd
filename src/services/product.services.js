import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

// import {__dirname} from '../path.js';
// import ProductDaoFS from '../daos/filesystem/product.dao.js';
// const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/product.json`);


export const getAll = async (page, limit, title, sort) => {
    try {
        return await prodDao.getProducts(page, limit, title, sort);
    } catch (e) {
        throw new Error(e);
    }
}

export const getByID = async (id) => {
    try {
        return await prodDao.getProductById(id);
    } catch (e) {
        throw new Error(e);
    }
}


export const create = async (obj) => {
    try {
        return await prodDao.createProduct(obj);
    } catch (e) {
        throw new Error(e);
    }
}


export const update = async (id, obj) => {
    try {
        return await prodDao.updateProduct(id, obj);
    } catch (e) {
        throw new Error(e);
    }
}


export const remove = async (id) => {
    try {
        return await prodDao.deleteProduct(id);
    } catch (e) {
        throw new Error(e);
    }
}