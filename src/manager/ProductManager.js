import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  #priceBase = 0.15;

  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
      } else return [];
    } catch (err) {
      console.log(err);
    }
  }



  // ACTIVIDAD 1-2
  // async addProduct(title, description, price, thumbnail, code, stock = 25) {
  //   if (!title || !description || !price || !thumbnail || !code) {
  //     throw new Error("Falta Agregar Campos");
  //   }

  //   const products = await this.getProducts();

  //   const maxId = await this.#getMaxId(products);

  //   const product = {
  //     id: maxId + 1,
  //     title,
  //     description,
  //     price: price + this.#priceBase,
  //     thumbnail,
  //     code,
  //     stock: stock,
  //   };
  //   products.push(product);
  //   await fs.promises.writeFile(this.path, JSON.stringify(products));
  // }


  // #getMaxId(products) {
  //   let maxId = 0;
  //   products.forEach((product) => {
  //     if (product.id > maxId) maxId = product.id;
  //   });
  //   return maxId;
  // }


  async createProduct(obj){
    try{
      const product = {
        id: uuidv4(),
        ...obj
      };
      const products = await this.getProducts();
      const productExist = products.find((p) => p.tile === product.title)
      if (productExist) return 'Producto already exists'
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    }catch(err){
      console.log(error);
    }

  }



  async getProductById(pid) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === parseInt(pid));
    console.log(product);
    if (product) {
      return product;
    } else {
      return null;
    }
  }


  async updateProduct(productId, attribute, newValue){
    const products = await manager.getProducts();

    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    products[productIndex][attribute] = newValue;
    
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  }

  async deleteProduct(productId){
    const products = await this.getProducts();
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
        throw new Error("Producto no encontrado");
    }

    products.splice(productIndex, 1);

    await fs.promises.writeFile(this.path, JSON.stringify(products));

  }

}