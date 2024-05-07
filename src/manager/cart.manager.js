import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { __dirname } from "../path.js";
import ProductManager from "../manager/ProductManager.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`);

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        if (carts.trim() === "") {
          await fs.promises.writeFile(this.path, "[]", "utf8");
          console.log("Se añadieron [] al archivo.");
          return [];
        } else {
          const cartsJSON = JSON.parse(carts);
          return cartsJSON;
        }
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      };
      const cartsFile = await this.getAllCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      console.log(id);
      const cart = carts.find((c) => c.id === id);
      console.log(cart);
      if (cart) {
        return cart;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async saveProducttoCart(idCart, idProduct) {
    try {
        console.log(idProduct);
        console.log(idCart);
      const prodExists = await productManager.getProductById(idProduct);
      if (!prodExists) throw new Error("Product not found");
      let cartExists = await this.getCartById(idCart);
      if (!cartExists) throw new Error("Cart not found");
      let cartsFile = await this.getAllCarts();
      const existProductInCart = cartExists.products.find(
        (p) => p.id === idProduct
      );
      if (!existProductInCart) {
        const product = {
          id: idProduct,
          quantity: 1,
        };
        cartExists.products.push(product);
      }else {
        existProductInCart.quantity++;
      }

      const updatedCarts = cartsFile.map((cart) =>{
        if(cart.id === idCart)  return cartExists;
        return cart
      })
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));


    } catch (err) {
      throw new Error(err);
    }
  }
}
