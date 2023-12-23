import httpStatus from 'http-status';
import { AppError } from '../../errors/appErrors';
import { AcademicSemester } from '../academic-semester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builders/QueryBuilder';
import { SemesterRegistrationStatusValue } from './semesterRegistration.constant';

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
      $or: [{ status: SemesterRegistrationStatusValue.ONGOING }, { status: SemesterRegistrationStatusValue.UPCOMING }],
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
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Registered Semester is not exists in database',
    );
  }

  // check, if the semester is already ended
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedSemesterStatus = payload?.status;
  if (currentSemesterStatus === SemesterRegistrationStatusValue.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There Semester is already ENDED. You can't update this Semester`,
    );
  }

  if (
    currentSemesterStatus === SemesterRegistrationStatusValue.UPCOMING &&
    requestedSemesterStatus === SemesterRegistrationStatusValue.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot directly change semester status ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }
  if (
    currentSemesterStatus === SemesterRegistrationStatusValue.ONGOING &&
    requestedSemesterStatus === SemesterRegistrationStatusValue.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot directly change semester status ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
