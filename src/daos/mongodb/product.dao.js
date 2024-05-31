// import fs from "fs";
// import { model } from "mongoose";
import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {

  // constructor(collection, schema) {
  //   this.collection = model(collection, schema);
  // }

  async getProducts() {
    try {
      // return await this.collection.find({})
      return await ProductModel.find({})
    } catch (err) {
      throw new Error(err);
    }
  }


  async getProductById(pid) {
    try {
      // return await this.collection.findById(pid);
      return await ProductModel.findById(pid);
    } catch (err) {
      throw new Error(err);
    }
  }

  async createProduct(obj){
    try{
    //  return this.colletion.create(obj);
     return ProductModel.create(obj);
    }catch(err){
      throw new Error(error);
    }

  }

  async updateProduct(obj, pid){
    try{
      // return await this.colletion.findByIdAndUpdate(id, obj, { new : true });
      return await ProductModel.findByIdAndUpdate(pid, obj, { new : true });
    }catch (error) {
      throw new Error(error)
    }
  }

  async deleteProduct(productId){
    try{
      return await ProductModel.findByIdAndDelete(productId);
    }catch (error) {
      throw new Error(error)
    }

  }

}