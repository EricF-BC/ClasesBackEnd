import { CartModel } from "./models/cart.model.js";
import MongoDao from "./mongo.dao.js";

export default class CartDaoMongoDB extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async createCart() {
    try {
      return await CartModel.create({
        products: [],
      });
    } catch (err) {
      throw new Error(err);
    }
  }


  async addProductToCart(idCart, idProduct, quantity) {
    try {
      const cart = await CartModel.findById(idCart);
      const productIndex = cart.products.findIndex(p => p.product.toString() === idProduct);
      if (productIndex  !== -1) {
          cart.products[productIndex].quantity = quantity;
      } else {
          cart.products.push({ product: idProduct, quantity });
      }

      await cart.save();
      return cart.products;
    } catch (err) {
      throw new Error(err);
    }
  }



  async existProdInCart(cartId, prodId){
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId}}

      })
    } catch (err) {
      throw new Error(err);
    }
  }


  async DeleteProductCart(cartId, prodId) {
    try {
      return await CartModel.findByIdAndUpdate(
        {_id: cartId},
        { $pull : { products: { product: prodId} } },
        { new: true }
      );
    } catch (err) {
      throw new Error(err);
    }
  }


  
  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cartId, 'products.product': prodId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true, runValidators: true }
      );
    } catch (err) {
      throw new Error(err);
    }
  }


  async clearCart(cartId){
    try{
      return await CartModel.findByIdAndUpdate(
        cartId,
        { $set: { products: [] }},
        {new: true}
      )
    } catch (err) {
      throw new Error(err);
    }
  }


}


