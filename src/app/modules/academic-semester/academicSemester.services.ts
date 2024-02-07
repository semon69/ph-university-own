import QueryBuilder from '../../builders/QueryBuilder';
import { AcademicSemesterSearchableFields, academicSemesterMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new Error('Wrong declearation of semester name and code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDb = async (query: Record<string, unknown>,) => {
  // const result = await AcademicSemester.find();
  // return result;
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
  .search(AcademicSemesterSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields();

const result = await academicSemesterQuery.modelQuery;
const meta = await academicSemesterQuery.countTotal();

return {
  meta,
  result,
};
};

const getSingleAcademicSemesterFromDb = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({ _id: semesterId });
  return result;
};

const updateSingleAcademicSemesterFromDb = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterMapper[payload.name] !== payload.code
  ) {
    throw new Error('Wrong declearation of semester name and code');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: semesterId },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const academicServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
  updateSingleAcademicSemesterFromDb,
};
