import CategoryRepo from 'share/category/infrastructure/repository/CategoryRepo';
import ResourceNotFoundExecption from 'share/infrastructure/exception/ResourceNotFoundExecption';

const repositoty = new CategoryRepo();

class CategoryServ {
    getAll() {
        return new Promise((resolve, reject) => {
            repositoty.getAll()
                        .then(resolve)
                        .catch(reject);
        });
    }

    getAllEnable() {
        return new Promise((resolve, reject) => {
            return repositoty.getAllEnable()
                            .then(resolve)
                            .catch(reject);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            return repositoty.findById(id)
                        .then(optCategory => {
                            if(optCategory.isPresent()) {
                                return resolve(optCategory.get());
                            }
                            return reject(new ResourceNotFoundExecption(`Categoty: ${id}`));
                        })
                        .catch(reject);
        });
    }

    delete(category) {
        return new Promise((resolve, reject) => {
            return repositoty.delete(category)
                            .then(resolve)
                            .catch(reject);
        });
    }

    update(category) {
        return new Promise((resolve, reject) => {
            return repositoty.update(category)
                            .then(resolve)
                            .catch(reject);
        });
    }

    save(category) {
        return new Promise((resolve, reject) => {
            return repositoty.save(category)
                            .then(resolve)
                            .catch(reject);
        });
    }
}

export default CategoryServ;