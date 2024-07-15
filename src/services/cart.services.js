import persistence from '../daos/persistence.js';
const { prodDao, cartDao } = persistence;

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

export const addProductToCart = async (idCart, idProduct) => {
    try {
        const cartExist = await getByID(idCart);
        const prodExist = await prodDao.getProductById(idProduct)
        if(!cartExist || !prodExist) return null;
        const existProdInCart = await cartDao.existProdInCart(idCart, idProduct);
        if(existProdInCart){
            const quantity = existProdInCart.products.find(p => p.product.toString() === idProduct).quantity +1;
            return await cartDao.addProductToCart(idCart, idProduct, quantity);
        }
        return await cartDao.addProductToCart(idCart, idProduct);
    } catch (e) {
        throw new Error(e);
    }
}

export const removeProductFromCart = async (idCart, idProduct) => {
    try {
        const cartExist = await getByID(idCart);
        const prodExist = cartExist.products.find(p => p.product._id.toString() === idProduct)
        if(!cartExist || !prodExist) return null;
        return await cartDao.DeleteProductCart(idCart, idProduct);

    } catch (e) {
        throw new Error(e);
    }
}


export const updateQuantityToCart = async (idCart, idProduct, quantity) => {
    try {
        const cartExist = await getByID(idCart);
        const prodExist = cartExist.products.find(p => p.product._id.toString() === idProduct)
        if(!cartExist || !prodExist) return null;
        return await cartDao.updateProdQuantityToCart(idCart, idProduct, quantity);

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

export const clearProductsFromCart = async (idCart) => {
    try {
        const cartExist = await getByID(idCart);
        if(!cartExist) return null;
        return await cartDao.clearCart(idCart);
    } catch (error) {
        
    }

}