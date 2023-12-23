import httpStatus from 'http-status';
import { AppError } from '../../errors/appErrors';
import { SemesterRegistration } from '../semester-registration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicDepartment } from '../academic-department/academicDepartment.model';
import { AcademicFaculty } from '../academic-faculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { hasTimeConflict } from './offeredCourse.utils';
import { SemesterRegistrationStatusValue } from '../semester-registration/semesterRegistration.constant';

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
  const academicSemester = isSemesterRegistrationExist?.academicSemester;

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

  // check, if the academic department is belong from that faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isAcademicDepartmentExist.name} does not belong from ${isAcademicFacultyExist.name}`,
    );
  }

  // check, if same offered course and same section exists in semester registration
  const isSameOfferedCourseExistWithSameSection = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isSameOfferedCourseExistWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with Same section cannot be offered again`,
    );
  }

  // Same faculty cannot get class in same time
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedules)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available in this time`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
  // return null;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {};

const getSingleOfferedCourseFromDB = async (id: string) => {};

const deleteOfferedCourseFromDB = async (id: string) => {};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  // //   check, if the offered course is exists
  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Offered course is not exist in database',
    );
  }

  //  check, if the faculty id is exists
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Faculty is not exist in database',
    );
  }

  const semesterRegistration = isOfferedCourseExist?.semesterRegistration;

  // check, if the semester is UPCOMING or not
  const isStatusUpcoming =
    await SemesterRegistration.findById(semesterRegistration);
  if (isStatusUpcoming?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This semester is not UPCOMING. You cannot update this semester offered course',
    );
  }

  // Same faculty cannot get class in same time
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedules)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available in this time`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
