import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is login successfully',
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req?.user;
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const {refreshToken} = req.cookies
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token generated successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken
};
