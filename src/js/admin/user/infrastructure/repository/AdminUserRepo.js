import AdminUser from 'admin/user/infrastructure/repository/schema/AdminUser';
import Optional from 'optional-js';

class AdminUserRepo {

    getAll() {
        return new Promise((resolve, reject) => {
            return AdminUser.find({}).then(users => {
                return resolve(Optional.ofNullable(users));
            }).catch(reject);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            return AdminUser.findById(id).then(user => { 
                return resolve(Optional.ofNullable(user));
            }).catch(reject);
        });
    }

    save(user) {
        return new Promise((resolve, reject) => {
            return AdminUser.register(user, user.password, (error, user) => {
                if (error) {
                    return reject(error);
                }
                return resolve(user);
            });
        });
    }

    update(user) {
        return new Promise((resolve, reject) => {
            return AdminUser.findById(user.id)
                            .then(oldUser => {
                                oldUser.setPassword(user.password, (error, updated, passError) => {
                                    if (error||passError) return reject(error|passError);
                                    updated.save();

                                    return AdminUser.findByIdAndUpdate(user.id, user)
                                                    .then(resolve)
                                                    .catch(reject);
                                }); 
                            })
                            .catch(reject);
        });
    }

    delete(user) {
        return new Promise((resolve, reject) => {
            return AdminUser.findByIdAndRemove(user.id)
                            .then(resolve)
                            .catch(reject);
        });
    }

}

export default AdminUserRepo;