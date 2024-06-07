import * as service from "../services/product.services.js";

export const getAllProducts = async (req, res) => {
    try{
        const { page, limit, title, sort } = req.query
        const response = await service.getAll(page, limit, title, sort);
        const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null;
        const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null;
        res.json({
            payload: response.docs,
            info: {
                count: response.totalDocs,
                totalPages: response.totalPages,
                nextLink: next,
                prevLink: prev,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage
            }
    });
    //res.status(200).json(response);
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
