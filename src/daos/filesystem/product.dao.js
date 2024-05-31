import fs from "fs";
import { v4 as uuidv4 } from "uuid";





export default class ProductDaoFS {
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

  async createProduct(obj){
    try{
      const product = {
        id: uuidv4(),
        status: true,
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


  async updateProduct(obj, id){
    try{
      const products = await this.getProducts();
      let productExist = await this.getProductById(id)
      if (!productExist) return "Product not found";
      productExist = { ...productExist, ...obj};
      const newArray = products.filter((p) => p.id !== parseInt(id));
      console.log(newArray);
      newArray.push(productExist);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));   
      return productExist;
    }catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(productId){
    const products = await this.getProducts();
    const productExist = await this.getProductById(productId)
    const productIndex = products.findIndex(product => product.id === parseInt(productId));

    if (productIndex === -1) {
        throw new Error("Producto no encontrado");
    }

    products.splice(productIndex, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return productExist;

  }

}