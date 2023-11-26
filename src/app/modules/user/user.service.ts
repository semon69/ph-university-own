import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create user
  const userData: Partial<TUser> = {};

  // If password is not given the use defalut password
  userData.password = password || (config.default_pass as string);

  //   set student role
  userData.role = 'student';

  // set manually generated id
  userData.id = '2010098203';

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id
    studentData.user = newUser._id //reference
    
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
