import factory from '../persistence/daos/factory.js';
import Services from './class.services.js';
const { prodDao, cartDao } = factory;


export default class CartServices extends Services {
    constructor() {
      super(cartDao);
    }

    addProductToCart = async (idCart, idProduct) => {
        try {
            const cartExist = await this.dao.getById(idCart);
            const prodExist = await prodDao.getById(idProduct)
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
    
    removeProductFromCart = async (idCart, idProduct) => {
        try {
            const cartExist = await this.dao.getByID(idCart);
            const prodExist = cartExist.products.find(p => p.product._id.toString() === idProduct)
            if(!cartExist || !prodExist) return null;
            return await cartDao.DeleteProductCart(idCart, idProduct);
    
        } catch (e) {
            throw new Error(e);
        }
    }
    
    
    updateQuantityToCart = async (idCart, idProduct, quantity) => {
        try {
            const cartExist = await this.dao.getByID(idCart);
            const prodExist = cartExist.products.find(p => p.product._id.toString() === idProduct)
            if(!cartExist || !prodExist) return null;
            return await this.dao.updateProdQuantityToCart(idCart, idProduct, quantity);
    
        } catch (e) {
            throw new Error(e);
        }
    }
    
    
    clearProductsFromCart = async (idCart) => {
        try {
            const cartExist = await this.dao.getByID(idCart);
            if(!cartExist) return null;
            return await cartDao.clearCart(idCart);
        } catch (error) {
            
        }
    }

}


