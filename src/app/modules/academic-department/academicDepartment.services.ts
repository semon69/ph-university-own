import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcadmicDepartmentsFromDb = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcadmicDepartmentFromDb = async (facultyId: string) => {
  const result = await AcademicDepartment.findById(facultyId);
  return result;
};

const updateSingleAcadmicDepartmentFromDb = async (facultyId: string, payload: Partial<TAcademicDepartment>) => {
  const result = await AcademicDepartment.findByIdAndUpdate(facultyId, payload, {new: true});
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcadmicDepartmentsFromDb,
  getSingleAcadmicDepartmentFromDb,
  updateSingleAcadmicDepartmentFromDb
};
