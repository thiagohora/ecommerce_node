import ProductRepo from 'admin/product/infrastructure/repository/ProductRepo';
import ResourceNotFoundExecption from 'share/infrastructure/exception/ResourceNotFoundExecption';

const repositoty = new ProductRepo();

function calcDiscount(product) {
    const discount = product.discount / 100;
    const real_price = product.sales_price;
    const sales_price = product.sales_price - (product.sales_price * discount);
    return Object.assign({}, product, { real_price, sales_price });
}

class ProductServ {
    getAll() {
        return new Promise((resolve, reject) => {
            repositoty.getAll()
                        .then(resolve)
                        .catch(reject);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            return repositoty.findById(id)
                        .then(optProduct => {
                            if(optProduct.isPresent()) {
                                return resolve(optProduct.get());
                            }
                            return reject(new ResourceNotFoundExecption(`Categoty: ${id}`));
                        })
                        .catch(reject);
        });
    }

    delete(product) {
        return new Promise((resolve, reject) => {
            return repositoty.delete(product)
                            .then(resolve)
                            .catch(reject);
        });
    }

    update(product) {
        return new Promise((resolve, reject) => {
            return findById(product.id)
                    .then(oldProduct => {
                        
                        let newProduct = product;
                        
                        if(product.discount != oldProduct.discount) {
                            newProduct = calcDiscount(product);
                        }

                        return repositoty.update(newProduct)
                                        .then(resolve)
                                        .catch(reject);
  
                    }).catch(reject);
            });
    }

    save(product) {        
        return new Promise((resolve, reject) => {
            return repositoty.save(calcDiscount(product))
                            .then(resolve)
                            .catch(reject);
        });
    }
}

export default ProductServ;