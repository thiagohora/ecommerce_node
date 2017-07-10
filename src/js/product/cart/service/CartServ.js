import CartRepo from 'product/cart/infrastructure/repository/CartRepo';
import ProductRepo from 'product/item/infrastructure/repository/ProductRepo';
import Cart from 'product/cart/domain/Cart';
import ResourceNotFoundExecption from 'share/infrastructure/exception/ResourceNotFoundExecption';


const repository = new CartRepo();
const productRepo = new ProductRepo();

class CartServ {

    save(cart) {
        return new Promise((resolve, reject) => { 
            return productRepo.findById(cart.productId)
                    .then(product => {
                        return repository.save(new Cart([product], cart.customerId))
                                            .then(resolve)
                                            .catch(reject);
                    })
                    .catch(reject);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => { 
            return repository.findById(id)
                    .then(product => {
                        return repository.findById(id)
                                            .then(optCart => {
                                                if(!optCart.isPresent())
                                                    return reject(new ResourceNotFoundExecption(`Cart: ${id}  not found`));
                                                return resolve(optCart.get());
                                            })
                                            .catch(reject);
                    })
                    .catch(reject);
        });
    }

}

export default CartServ;