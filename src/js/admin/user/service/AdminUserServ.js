import AdminUserRepo from 'admin/user/infrastructure/repository/AdminUserRepo';
import ResourceNotFoundExecption from 'share/infrastructure/exception/ResourceNotFoundExecption';

const repositoty = new AdminUserRepo();

class AdminUserServ {
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
                        .then(optUser => {
                            if(optUser.isPresent()) {
                                return resolve(optUser.get());
                            }
                            return reject(new ResourceNotFoundExecption(`User: ${id}`));
                        })
                        .catch(reject);
        });
    }

    delete(user) {
        return new Promise((resolve, reject) => {
            return repositoty.delete(user)
                            .then(resolve)
                            .catch(reject);
        });
    }

    update(user) {
        return new Promise((resolve, reject) => {
            return repositoty.update(user)
                            .then(resolve)
                            .catch(reject);
        });
    }

    save(user) {
        return new Promise((resolve, reject) => {
            return repositoty.save(user)
                            .then(resolve)
                            .catch(reject);
        });
    }
}

export default AdminUserServ;