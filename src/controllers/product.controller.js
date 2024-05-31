import * as service from "../services/product.services.js";

export const getAllProducts = async (req, res) => {
    try{
        const reponse = await service.getAll();
        res.json(reponse);
    } catch(e){
        console.log(e);
    }
}

export const getProductByIdController = async (req, res) => {
    try{
        const { pid } = req.params;
        const product = await service.getByID(pid);
        if (!product) res.json({msg: 'Product not found'});
        res.json(product);
    } catch(e){
        console.log(e);
    }
}

export const createProductController = async (req, res) => {
    try{
        const newProd = await service.create(req.body);
        if (!newProd) res.json({msg: 'Error creating Product'});
        else res.json(newProd);
    } catch(e){
        console.log(e);
    }

}

export const updateProductController = async (req, res) => {
    try{
        const { pid } = req.params;
        const prodUpd = await service.update(pid, req.body);
        if (!prodUpd) res.json({msg: 'Error updating Product'});
        else res.json(prodUpd);
    } catch(e){
        console.log(e);
    }

}


export const deleteProductController = async (req, res) => {
    try{
        const { pid } = req.params;
        const prodDel = await service.remove(pid);
        console.log("HOLA");
        if (!prodDel) res.json({msg: 'Error deleting Product'});
        else res.json(prodDel);
    } catch(e){
        console.log(e);
    }

}
