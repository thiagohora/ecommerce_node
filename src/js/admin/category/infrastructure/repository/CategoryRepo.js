import Category from 'admin/category/infrastructure/repository/schema/Category';
import slugfy from 'share/utils/slugfy';
import Optional from 'optional-js';

class CategoryRepo {

    getAll() {
        return new Promise((resolve, reject) => {
            return Category.find({}).then(categories => {
                return resolve(Optional.ofNullable(categories));
            }).catch(reject);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            return Category.findById(id).then(category => { 
                return resolve(Optional.ofNullable(category));
            }).catch(reject);
        });
    }

    save(category) {
        return new Promise((resolve, reject) => {
            return Category.create(Object.assign({}, category, { slug: slugfy(category.name) }))
                            .then(resolve)
                            .catch(reject);
        });
    }

    update(category) {
        return new Promise((resolve, reject) => {
            return Category.findByIdAndUpdate(category.id, Object.assign({}, category, { slug: slugfy(category.name) }))
                            .then(resolve)
                            .catch(reject);
        });
    }

    delete(category) {
        return new Promise((resolve, reject) => {
            return Category.findByIdAndRemove(category.id)
                            .then(resolve)
                            .catch(reject);
        });
    }

}

export default CategoryRepo;