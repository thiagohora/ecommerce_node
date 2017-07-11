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
                    .then(optProduct => {
                        if(!optProduct.isPresent()) {
                            return reject(new ResourceNotFoundExecption(`Product: ${cart.productId} not found`));
                        }

                        return repository.save(new Cart([ { product: optProduct.get() } ], cart.customerId))
                                        .then(resolve)
                                        .catch(reject);
                    })
                    .catch(reject);
        });
    }

    addProduct(id, productId) {
        return new Promise((resolve, reject) => {
            return productRepo.findById(productId).then(optProduct => {

                if(!optProduct.isPresent()) {
                    return reject(new ResourceNotFoundExecption(`Product: ${productId} not found`));
                }

                return repository.findById(id).then(optCart => {
                        if(!optCart.isPresent())
                            return reject(new ResourceNotFoundExecption(`Cart: ${id}  not found`));

                        const product = optProduct.get();
                        const cart = optCart.get();
                        const item = cart.products.find(cartItem => cartItem.product._id.toString() === product._id.toString());

                        if(item)
                            item.quantity++;
                        else
                            cart.products.push( { product, quantity: 1 } );

                        cart.save();

                        return resolve(cart);
                }).catch(reject);
            }).catch(reject);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => { 
            return repository.findById(id)
                    .then(optCart => {
                            if(!optCart.isPresent())
                                return reject(new ResourceNotFoundExecption(`Cart: ${id}  not found`));
                            return resolve(optCart.get());
                    })
                    .catch(reject);
        });
    }

}

export default CartServ;