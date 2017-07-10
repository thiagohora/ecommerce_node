import Product from 'product/item/infrastructure/repository/schema/Product';
import slugfy from 'share/utils/slugfy';
import Optional from 'optional-js';

class ProdutoRepo {

    getAll() {
        return new Promise((resolve, reject) => {
            return Product.find({}).then(products => {
                return resolve(Optional.ofNullable(products));
            }).catch(reject);
        });
    }

    findByCategory(categoty) {
        return new Promise((resolve, reject) => {
            return Product.find({ categoty: categoty._id }).then(products => {
                return resolve(Optional.ofNullable(products));
            }).catch(reject);
        });
    }

    getAllEnable() {
        return new Promise((resolve, reject) => {
            Product.find({
                enable: true
            }).then(products => {
                return resolve(Optional.ofNullable(products));
            }).catch(reject);
        });
    }

    findOne(product) {
        return new Promise((resolve, reject) => {
            return Product.findOne(product).then(product => { 
                return resolve(Optional.ofNullable(product));
            }).catch(reject);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            return Product.findById(id).then(product => { 
                return resolve(Optional.ofNullable(product));
            }).catch(reject);
        });
    }

    save(product) {
        return new Promise((resolve, reject) => {
            return Product.create(Object.assign({}, product, { slug: slugfy(product.name) }))
                            .then(resolve)
                            .catch(reject);
        });
    }

    update(product) {
        return new Promise((resolve, reject) => {
            return Product.findByIdAndUpdate(product.id, Object.assign({}, product, { slug: slugfy(product.name) }))
                            .then(resolve)
                            .catch(reject);
        });
    }

    delete(product) {
        return new Promise((resolve, reject) => {
            return Product.findByIdAndRemove(product.id)
                            .then(resolve)
                            .catch(reject);
        });
    }
}

export default ProdutoRepo;