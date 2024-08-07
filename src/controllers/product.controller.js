import ProductServices from "../services/product.services.js";
import { HttpResponse } from "../utils/http.response.js";
import Controllers from "./class.controller.js";

const httpResponse = new HttpResponse();
const prodService = new ProductServices();

export default class ProductController extends Controllers {
    constructor(){
        super(prodService);
    }

    createProductMock = async (req, res, next) => {
        try {
            const { cant } = req.query
            res.json(await this.service.createProductMock(cant));
        } catch (error) {
            next(error)
        }
    }

    createProd = async(req, res, next) => {
        try {
            const newProd = await this.service.createProd(req.body);
            return httpResponse.Ok(res, newProd);
        } catch (error) {
            next(error)
        }
    }

    getAllProductsViews = async (req, res, next) => {
        try {
            return await this.service.getAllViews();
        } catch (error) {
            next(error);
        }
    
    }

    getProdById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await this.service.getProdById(id);
            return httpResponse.Ok(res, data);
        } catch (error) {   
            next(error);
        }
    }
    
}


