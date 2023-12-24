import httpStatus from 'http-status';
import { AppError } from '../../errors/appErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // check, is users exists or not
  // const isUserExists = await User.findOne({ id: payload?.id });
  const user = await User.isUserExists(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
  }

  // check, is users deleted or not
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is Deleted');
  }

  // check, is users blocked or not
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  // // check, is password right or wrong
  const passwordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!passwordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched');
  }

  // Set access token
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
