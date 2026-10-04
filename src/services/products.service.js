import logger from "../config/logger.js";
import productsRepository from "../repositories/products.repository.js";
import CustomError from "../errors/CustomError.js";
import ErrorCodes from "../errors/ErrorCodes.js"; 

class ProductsService {

    async getProducts(page = 1, limit = 10) {
        return await productsRepository.getAll({ page, limit });
    }

    async getProductById(id) {

        const product = await productsRepository.getById(id);

     if (!product) {
    logger.warning(`Producto no encontrado: ${id}`);
    throw new CustomError(
        ErrorCodes.PRODUCT_NOT_FOUND
    );
}
        return product;
    }

    async createProduct(data) {
        if (!data.title) {
    throw new CustomError(ErrorCodes.VALIDATION_ERROR, "El título es obligatorio");
}

        if (data.price <= 0) {
    throw new CustomError(ErrorCodes.VALIDATION_ERROR, "El precio debe ser mayor a cero");
}
        logger.info(`Producto creado: ${data.title}`);    
        return await productsRepository.create(data);
        
}
    async updateProduct(id, data) {

        const product = await productsRepository.update(id, data);

        if (!product) {
    logger.warning(`Intento de actualizar un producto inexistente: ${id}`);
    throw new CustomError(
        ErrorCodes.PRODUCT_NOT_FOUND
    );
}

        return product;
    }

    async deleteProduct(id) {

        const product = await productsRepository.delete(id);

     if (!product) {
    logger.warning(`Intento de eliminar un producto inexistente: ${id}`);
    throw new CustomError(
        ErrorCodes.PRODUCT_NOT_FOUND
    );
}

        return product;
    }

}

export default new ProductsService();