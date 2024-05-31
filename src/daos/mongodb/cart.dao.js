import { CartModel } from "./models/cart.model.js";
import ProductDaoMongoDB from "./product.dao.js";

export default class CartDaoMongoDB {

  async getAllCarts() {
    try {
      return await CartModel.find({})
    } catch (err) {
      throw new Error(err);
    }
  }

  async createCart() {
    try {
      const newCart = new CartModel();
      await newCart.save();
      return newCart
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCartById(id) {
    try {
      return await CartModel.findById(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async saveProducttoCart(idCart, idProduct, quantity) {
    try {
      let cart = await this.findById(idCart);
      if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
      }

      const productIndex = cart.products.findIndex(p => p.idProduct.toString() === idProduct);

      if (productIndex > -1) {
          cart.products[productIndex].quantity += quantity;
      } else {
          cart.products.push({ idProduct, quantity });
      }
      await cart.save();
    } catch (err) {
      throw new Error(err);
    }
  }


  async DeleteCart(id) {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}


