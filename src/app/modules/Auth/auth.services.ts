import httpStatus from 'http-status';
import { AppError } from '../../errors/appErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

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
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // check, is users exists or not
  // const isUserExists = await User.findOne({ id: payload?.id });
  const user = await User.isUserExists(userData.userId);

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
    payload?.oldPassword,
    user?.password,
  );
  if (!passwordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched');
  }

  // hashed password
  const hashedNewPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: hashedNewPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized person',
    );
  }

  // check, is token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;

  // check, is users exists or not
  const user = await User.isUserExists(userId);

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

  // check, when password change
  if (
    user?.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChange(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized person',
    );
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  // check, is users exists or not
  const user = await User.isUserExists(userId);

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

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    '10m',
  );

  const resetLink = `http://localhost:3000/id=${user.id}&token=${resetToken}`

  sendEmail(user.email, resetLink)

  // return {
  //   accessToken,
  // };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword
};
