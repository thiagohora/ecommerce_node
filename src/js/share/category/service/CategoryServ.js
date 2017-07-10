import CategoryRepo from 'share/category/infrastructure/repository/CategoryRepo';
import ResourceNotFoundExecption from 'share/infrastructure/exception/ResourceNotFoundExecption';

const repository = new CategoryRepo();

class CategoryServ {
    getAllEnable() {
        return new Promise((resolve, reject) => {
            return repository.getAllEnable()
                        .then(resolve)
                        .catch(reject);
        });
    }

    findOne(category) {
        return new Promise((resolve, reject) => {
            return repository.findOne(category)
                        .then(optCategory => {
                            if(!optCategory.isPresent())
                                return reject(new ResourceNotFoundExecption(`Category: ${category} not found`));
                            return resolve(optCategory.get());
                        })
                        .catch(reject);
        });
    }
}

export default CategoryServ;