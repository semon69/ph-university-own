export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

// export interface UserModel extends Model<TUser> {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(id: string): Promise<TUser | null>;
// }