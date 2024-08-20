export default class ProductDTO {
    constructor(product) {
        this.title = product.nombre || product.title;
        this.description = product.descripcion || product.description;
        this.price = product.precio || product.price;
        this.stock = product.disponibilidad || product.stock;
        this.owner = product.dueño || product.owner;
    }
}