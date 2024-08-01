import { createResponse } from "../path.js";
import ProductServices from "../services/product.services.js";
import Controllers from "./class.controller.js";

const prodService = new ProductServices();

export default class ProductController extends Controllers {
    constructor(){
        super(prodService);
    }

    createProd = async(req, res) => {
        try {
            const newProd = await this.service.createProd(req.body);
            return createResponse(res, 200, newProd);
        } catch (error) {
            throw new Error(error)
        }
    }

    getAllProductsViews = async (req, res) => {
        try {
            return await this.service.getAllViews();
        } catch (error) {
            throw new Error(error);
        }
    
    }

    getProdById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.getProdById(id);
            return createResponse(res, 200, data);
        } catch (error) {   
            throw new Error(error);
        }
    }
    
}


