import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";

const cartDao = new CartDaoMongoDB();

export const getAll = async () => {
    try {
        return await cartDao.getAllCarts();
    } catch (e) {
        throw new Error(e);
    }
}

export const getByID = async (id) => {
    try {
        return await cartDao.getCartById(id);
    } catch (e) {
        throw new Error(e);
    }
}

export const create = async () => {
    try {
        return await cartDao.createCart();
    } catch (e) {
        throw new Error(e);
    }
}

export const update = async (id, obj, quantity) => {
    try {
        return await cartDao.saveProducttoCart(id, obj, quantity);
    } catch (e) {
        throw new Error(e);
    }
}


export const remove = async (id) => {
    try {
        return await cartDao.DeleteCart(id);
    } catch (e) {
        throw new Error(e);
    }
}