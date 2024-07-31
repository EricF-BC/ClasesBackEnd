import * as service from "../services/cart.services.js";

export const getAllCarts = async (req, res) => {
    try{
        const reponse = await service.getAll();
        res.json(reponse);
    } catch(e){
        console.log(e);
    }
}

export const getCartByIdController = async (req, res) => {
    try{
        console.log(req.params);
        const { cid } = req.params;
        const cart = await service.getByID(cid);
        if (!cart) res.json({msg: 'cart not found'});
        res.json(cart);
    } catch(e){
        console.log(e);
    }
}

export const createCartController = async (req, res) => {
    try{
        const newCart = await service.create();
        if (!newCart) res.json({msg: 'Error creating Cart'});
        else res.json(newCart);
    } catch(e){
        console.log(e);
    }

}

export const addProductToCart = async (req, res) => {
    try{
        const { cartId } = req.session.user;
        const { pid } = req.params;
        const newProdToUserCart = await service.addProductToCart(cartId._id, pid);
        console.log(newProdToUserCart);
        if (!newProdToUserCart) res.json({msg: 'Product or cart not found'});
        return res.json({msg: 'Producto agregado'})
    } catch(e){
        console.log(e);
    }

}


export const deleteCartController = async (req, res) => {
    try{
        const { cid } = req.params;
        const cartDel = await service.remove(cid);
        if (!cartDel) res.json({msg: 'Error deleting Product'});
        else res.json(cartDel);
    } catch(e){
        console.log(e);
    }

}

export const deleteProductFromCartController = async (req, res) => {
    try{
        const { cid } = req.params;
        const { pid } = req.params;
        const delProdToUserCart = await service.removeProductFromCart(cid, pid);

        if (!delProdToUserCart) res.json({msg: 'Error  to remove Product from Cart'});
        else res.json({msg: `Successfully deleted ${pid} Product`});

    } catch(e){
        console.log(e);
    }

}


export const updateProdQuantityToCartController = async (req, res) => {
    try{
        const { cid } = req.params;
        const { pid } = req.params;
        const { quantity } = req.body;
        const updateProdToUserCart = await service.updateQuantityToCart(cid, pid, quantity);

        if (!updateProdToUserCart) res.json({msg: 'Error to update Product from Cart'});
        else res.json({msg: `Successfully updated ${pid} Product`});

    } catch(e){
        console.log(e);
    }

}


export const clearProductsFromCartController = async (req, res) => {
    const { cid } = req.params;
    const clearCart = await service.clearProductsFromCart(cid);

    if (!clearCart) res.json({msg: 'Error to clear Cart'});
    else res.json(clearCart);
 }
