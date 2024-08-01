import MongoDao from "./mongo.dao.js";
import { ProductModel } from './models/product.model.js';

export default class ProductDaoMongo extends MongoDao {
    constructor(){
        super(ProductModel);
    }

    async getProductsView(){
        const data = await ProductModel.find().lean();
    return data;
    }

};