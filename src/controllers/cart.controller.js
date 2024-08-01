import CartServices from "../services/cart.services.js";
import Controllers from "./class.controller.js";

const cartService = new CartServices();

export default class CartController extends Controllers {
    constructor(){
        super(cartService);
    }
    getCartByIdController = async (req, res) => {
        try{
            console.log(req.params);
            const { cid } = req.params;
            const cart = await this.service.getByID(cid);
            if (!cart) res.json({msg: 'cart not found'});
            res.json(cart);
        } catch(e){
            console.log(e);
        }
    }
    
    createCartController = async (req, res) => {
        try{
            const newCart = await this.service.create();
            if (!newCart) res.json({msg: 'Error creating Cart'});
            else res.json(newCart);
        } catch(e){
            console.log(e);
        }
    
    }
    
    addProductToCart = async (req, res) => {
        try{
            const { cartId } = req.session.user;
            const { id } = req.params;
            const newProdToUserCart = await this.service.addProductToCart(cartId._id, id);
            console.log(newProdToUserCart);
            if (!newProdToUserCart) res.json({msg: 'Product or cart not found'});
            return res.json({msg: 'Producto agregado'})
        } catch(e){
            console.log(e);
        }
    
    }
    
    
    
    deleteProductFromCartController = async (req, res) => {
        try{
            const { cid } = req.params;
            const { pid } = req.params;
            const delProdToUserCart = await this.service.removeProductFromCart(cid, pid);
    
            if (!delProdToUserCart) res.json({msg: 'Error  to remove Product from Cart'});
            else res.json({msg: `Successfully deleted ${pid} Product`});
    
        } catch(e){
            console.log(e);
        }
    
    }
    
    
    updateProdQuantityToCartController = async (req, res) => {
        try{
            const { cid } = req.params;
            const { pid } = req.params;
            const { quantity } = req.body;
            const updateProdToUserCart = await this.service.updateQuantityToCart(cid, pid, quantity);
    
            if (!updateProdToUserCart) res.json({msg: 'Error to update Product from Cart'});
            else res.json({msg: `Successfully updated ${pid} Product`});
    
        } catch(e){
            console.log(e);
        }
    
    }
    
    
    clearProductsFromCartController = async (req, res) => {
        const { cid } = req.params;
        const clearCart = await this.service.clearProductsFromCart(cid);
    
        if (!clearCart) res.json({msg: 'Error to clear Cart'});
        else res.json(clearCart);
     }

}

