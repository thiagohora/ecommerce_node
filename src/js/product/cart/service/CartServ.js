import CartRepo from 'product/cart/infrastructure/repository/CartRepo';
import ProductRepo from 'product/item/infrastructure/repository/ProductRepo';
import Cart from 'product/cart/domain/Cart';
import PagSeguro from 'product/cart/infrastructure/payment/pagseguro';
import { parseString } from 'xml2js'; 

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

                return this.findById(id).then(cart => {

                        const product = optProduct.get();
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

                            const cart = optCart.get();
                            cart.products.forEach(cartItem => cartItem.total_price =  cartItem.product.sales_price * cartItem.quantity);
                            cart.products.forEach(cartItem => cart.total += cartItem.total_price);

                            return resolve(cart);
                    })
                    .catch(reject);
        });
    }

    finish(id, redirectUrl) {
        return new Promise((resolve, reject) => {
            return this.findById(id)
                        .then(cart => {

                            if(!cart.customer) 
                                return reject(new ResourceNotFoundExecption(`Customer: ${id}  not found`));

                            const customer = cart.customer;
                            const pagseguro = PagSeguro.getInstance();

                            pagseguro.setRedirectURL(redirectUrl);

                            let counter = 1;
                            cart.products.forEach(item => {
                                pagseguro.addItem({
                                    id: counter++,
                                    description: item.product.desc,
                                    amount: item.product.sales_price.toFixed(2).toLocaleString('en-US', { minimiumFractionDigits: 2 }),
                                    quantity: item.quantity,
                                    weight: 1
                                })
                            });

                            const phone = customer.celphone;
                            pagseguro.buyer({
                                name: customer.name,
                                email: customer.email,
                                phoneAreaCode: phone && phone.slice(0, 2),
                                phoneNumber: phone && phone.slice(2, 11), 
                            });

                            const address =  customer.address;
                            pagseguro.shipping({
                                type: 1,
                                street: address.street,
                                number: address.number,
                                complement: '', 
                                district: address.neightborhood,
                                postalCode: '',
                                city: address.city,
                                state: 'SP',
                                country: 'BRA'
                            });

                            pagseguro.send((error, result) => {
                                if(error) {
                                    return reject(error);
                                }

                                parseString(result, (error, result) => {
                                    if(error) {
                                        return reject(error);
                                    }

                                    let checkoutCode = result.checkout.code[0];

                                    return resolve(`https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${checkoutCode}`);
                                });
                            });
                        })
                        .catch(reject);
        });
    }

}

export default CartServ;