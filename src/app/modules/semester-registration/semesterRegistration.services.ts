import httpStatus from 'http-status';
import { AppError } from '../../errors/appErrors';
import { AcademicSemester } from '../academic-semester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builders/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check, is academic semester exists
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester is not exists in database',
    );
  }

  // check, is this academic semester already registered
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Academic Semester is already registered',
    );
  }

  // Check, if there is any UPCOMING or ONGOING semester
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'ONGOING' }, { status: 'UPCOMING' }],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already ${isThereAnyUpcomingOrOngoingSemester.status} Semester. You can't create new semester`,
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {

  // check, is semester registration exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Registered Semester is not exists in database',
    );
  }

  // check, if the semester is already ended
  const currentSemesterStatus = isSemesterRegistrationExists?.status
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There Semester is ENDED. You can't update this Semester`,
    );
  }
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
