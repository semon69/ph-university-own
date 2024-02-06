import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  id: '0001',
  email: 'smdemon3@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

export const seedSuperAdmin = async() => {
    // create super admin when database is connecting
    const isSuperAdminExists = await User.findOne({role: USER_ROLE.superAdmin})

    if(!isSuperAdminExists){
        await User.create(superUser)
    }
};
