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
            const owner = req.session.role === "admin" ? "admin" : req.session.email;
            const newProduct = {
                ...req.body,
                owner: owner
            }
            const newProd = await this.service.createProd(newProduct);
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

    deleteProductC = async (req, res, next) => {
        try {
            const { id } = req.params;
            const productExists = await this.service.getById(id);
            if (!productExists) return httpResponse.NotFound(res, productExists);
            if(productExists.owner !== req.session.user.email && req.session.user.role !== "admin") return httpResponse.Unauthorized(res, productExists);
            const data = await this.service.delete(id);
            if(!data) return httpResponse.NotFound(res, data);
              else return httpResponse.Ok(res, data);
          } catch (error) {
            next(error);
          }
    }
    
}


