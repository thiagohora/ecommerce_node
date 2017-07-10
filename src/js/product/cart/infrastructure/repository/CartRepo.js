import Cart from 'product/cart/infrastructure/repository/schema/Cart';
import Optional from 'optional-js';

class CartRepo {
    save(cart) {
        return new Promise((resolve, reject) => {
            return Cart.create(cart)
                        .then(resolve)
                        .catch(reject);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            return Cart.findById(id)
                        .populate('customer')
                        .populate('products.product')
                        .then(cart => {
                            return resolve(Optional.ofNullable(cart))
                        })
                        .catch(reject);
        });
    }
}

export default CartRepo;