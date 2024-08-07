import factory from '../persistence/daos/factory.js';
import Services from './class.services.js';
import ProductRepository from '../persistence/repository/product.repository.js';
import { generateProduct } from '../utils/product.utils.js';

const { prodDao } = factory;
const prodRepository = new ProductRepository();

export default class ProductServices extends Services {
    constructor(){
        super(prodDao);
    }

    createProductMock = async(cant = 100) => {
        try {
            const productArray = [];
            for (let i = 0; i <cant; i++) {
                const prod = generateProduct();
                productArray.push(prod);
            }
            return await prodDao.create(productArray);
        } catch (error) {
            throw new Error(error)
        }
    }

    createProd = async(prod) =>{
        try {
            return await prodRepository.createProd(prod);
        } catch (error) {
            throw new Error(error);
        }
    }

    getAllViews = async () => {
        try {
            return await prodDao.getProductsView();
        } catch (e) {
            throw new Error(e);
        }
    }

    getProdById = async(id) => {
        try {
            return await prodRepository.getProdById(id);
        } catch (error) {
            throw new Error(error);
        }
    }


}


