import CartServices from "../services/cart.services.js";
import { HttpResponse } from "../utils/http.response.js";
import Controllers from "./class.controller.js";

const httpResponse = new HttpResponse();
const cartService = new CartServices();

export default class CartController extends Controllers {
    constructor(){
        super(cartService);
    }
    getCartByIdController = async (req, res, next) => {
        try{
            const { cid } = req.params;
            const cart = await this.service.getByID(cid);
            if (!cart) res.json({msg: 'cart not found'});
            res.json(cart);
        } catch(error){
            next(error);
        }
    }
    
    createCartController = async (req, res, next) => {
        try{
            const newCart = await this.service.create();
            if (!newCart) res.json({msg: 'Error creating Cart'});
            else res.json(newCart);
        } catch(error){
            next(error);
        }
    
    }
    
    addProductToCart = async (req, res, next) => {
        try{
            const { cartId, role } = req.session.user;
            const { id } = req.params;
            if(role === 'premium') return httpResponse.Unauthorized(res, role);
            const newProdToUserCart = await this.service.addProductToCart(cartId._id, id);
            if (!newProdToUserCart) res.json({msg: 'Product or cart not found'});
            return res.json({msg: 'Producto agregado'})
        } catch(error){
            next(error);
        }
    
    }
    
    
    
    deleteProductFromCartController = async (req, res, next) => {
        try{
            const { cid } = req.params;
            const { pid } = req.params;
            const delProdToUserCart = await this.service.removeProductFromCart(cid, pid);
    
            if (!delProdToUserCart) res.json({msg: 'Error  to remove Product from Cart'});
            else res.json({msg: `Successfully deleted ${pid} Product`});
    
        } catch(error){
            next(error);
        }
    
    }
    
    
    updateProdQuantityToCartController = async (req, res, next) => {
        try{
            const { cid } = req.params;
            const { pid } = req.params;
            const { quantity } = req.body;
            const updateProdToUserCart = await cartService.updateQuantityToCart(cid, pid, quantity);
    
            if (!updateProdToUserCart) res.json({msg: 'Error to update Product from Cart'});
            else res.json({msg: `Successfully updated ${pid} Product`});
    
        } catch(error){
            next(error);
        }
    
    }
    
    
    clearProductsFromCartController = async (req, res) => {
        const { cid } = req.params;
        const clearCart = await this.service.clearProductsFromCart(cid);
    
        if (!clearCart) res.json({msg: 'Error to clear Cart'});
        else res.json(clearCart);
     }

}

