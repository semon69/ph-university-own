import QueryBuilder from '../../builders/QueryBuilder';
import { AcademicFacultySearchableFields } from './academicFaculty.constant';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcadmicFacultiesFromDb = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
  .search(AcademicFacultySearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields();

const result = await academicFacultyQuery.modelQuery;
const meta = await academicFacultyQuery.countTotal();

return {
  meta,
  result,
};
};

const getSingleAcadmicFacultiesFromDb = async (facultyId: string) => {
  const result = await AcademicFaculty.findById(facultyId);
  return result;
};

const updateSingleAcadmicFacultyFromDb = async (
  facultyId: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({_id: facultyId}, payload, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcadmicFacultiesFromDb,
  getSingleAcadmicFacultiesFromDb,
  updateSingleAcadmicFacultyFromDb,
};
