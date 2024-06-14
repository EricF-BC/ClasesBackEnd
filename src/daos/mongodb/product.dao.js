// import fs from "fs";
// import { model } from "mongoose";
import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {

  // constructor(collection, schema) {
  //   this.collection = model(collection, schema);
  // }

  async getProducts(page = 1 ,limit = 10, title, sort) {
    try {
      // return await this.collection.find({})
      //return await ProductModel.find({})
      const filter = title ? { 'title': title } : {};
      let sortOrder = {};
      if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
      const response = await ProductModel.paginate(filter, { page, limit, sort: sortOrder });
      return response;
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

  async getProductsView(){
    const data = await ProductModel.find().lean();
    return data;
  }

}