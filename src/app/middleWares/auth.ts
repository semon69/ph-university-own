import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/appErrors';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check, is token sent by user
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized person',
      );
    }

    // check, is token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_token as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Person');
    }
    const { userId, role, iat } = decoded;

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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized person',
      );
    }
    // decoded undefined
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
