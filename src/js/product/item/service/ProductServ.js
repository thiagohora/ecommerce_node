import ProductRepo from 'product/item/infrastructure/repository/ProductRepo';
import ResourceNotFoundExecption from 'share/infrastructure/exception/ResourceNotFoundExecption';

const repository = new ProductRepo();

class ProductServ {
    findById(id) {
        return new Promise((resolve, reject) => {
            return repository.findById(id)
                        .then(resolve)
                        .catch(reject);
        });
    }

    findByCategory(categoty) {
        return new Promise((resolve, reject) => {
            return repository.findByCategory({ categoty })
                            .then(resolve)
                            .catch(reject);
        });
    }

    findOne(product) {
        return new Promise((resolve, reject) => {
            return repository.findOne(product)
                           .then(optProduct => {
                                if(optProduct.isPresent()) {
                                    return resolve(optProduct.get());
                                }
                                return reject(new ResourceNotFoundExecption(`Product: ${id}`));
                            })
                            .catch(reject);
            });
    }

    getAllEnable() {
        return new Promise((resolve, reject) => {
            return repository.getAllEnable()
                        .then(resolve)
                        .catch(reject);
        });
    } 
}

export default ProductServ;