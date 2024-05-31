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
        const { id } = req.params;
        const cart = await service.getByID(id);
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

export const updateCartController = async (req, res) => {
    try{
        const { cartId, productID, quantity } = req.body;
        
        if (!cartId || !productID || quantity == null) {
            return res.status(400).json({ error: 'Se necesita, cartid, product id y cantidad' });
        }

        const cart = await service.update(cartId, productID, quantity);

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