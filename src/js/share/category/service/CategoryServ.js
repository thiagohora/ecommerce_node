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
}

export default CategoryServ;