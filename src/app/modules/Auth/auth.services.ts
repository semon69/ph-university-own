import httpStatus from 'http-status';
import { AppError } from '../../errors/appErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {
  // check, is users exists or not
  const isUserExists = await User.findOne({ id: payload?.id });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
  }

  // check, is users deleted or not
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is Deleted');
  }

  // check, is users blocked or not
  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  // check, is password right or wrong
  const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password)
  console.log(isPasswordMatched);
  

  return {};
};

export const AuthServices = {
  loginUser,
};
