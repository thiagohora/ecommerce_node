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
}

export default ProductServ;