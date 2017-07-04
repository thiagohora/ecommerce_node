export default class Product {
    constructor( {  name = null, desc = null, enable = null, slug = null, discount = 0, 
                    image = null, sales_price = 0, real_price = 0, category = {} , quantity = 0,  } = {}) {
        this.name = name;
        this.desc = desc;
        this.enable = enable;
        this.slug = slug;
        this.discount = discount;
        this.image = image;
        this.sales_price = sales_price;
        this.real_price = real_price;
        this.category = category;
        this.quantity = quantity;
    }
}