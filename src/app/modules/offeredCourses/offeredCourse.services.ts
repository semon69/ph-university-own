import httpStatus from 'http-status';
import { AppError } from '../../errors/appErrors';
import { SemesterRegistration } from '../semester-registration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicDepartment } from '../academic-department/academicDepartment.model';
import { AcademicFaculty } from '../academic-faculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  

  // //   check, if the semester registration id is exists
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester registraiton is not exist in database',
    );
  }
  const academicSemester = isSemesterRegistrationExist?.academicSemester

  //   check, if the academic faculty id is exists
  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Faculty is not exist in database',
    );
  }

  // //   check, if the academic department id is exists
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Department is not exist in database',
    );
  }

  // //   check, if the course id is exists
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Course is not exist in database',
    );
  }

  // //   check, if the faculty id is exists
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Faculty is not exist in database',
    );
  }

  const result = await OfferedCourse.create({...payload, academicSemester});
  return result;
  // console.log(payload);
  
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {};

const getSingleOfferedCourseFromDB = async (id: string) => {};

const deleteOfferedCourseFromDB = async (id: string) => {};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
