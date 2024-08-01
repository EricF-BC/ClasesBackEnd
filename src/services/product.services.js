import factory from '../persistence/daos/factory.js';
import Services from './class.services.js';
import ProductRepository from '../persistence/repository/product.repository.js';

const { prodDao } = factory;
const prodRepository = new ProductRepository();

export default class ProductServices extends Services {
    constructor(){
        super(prodDao);
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


