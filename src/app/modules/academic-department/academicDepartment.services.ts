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

const getSingleAcadmicDepartmentFromDb = async (departmentId: string) => {
  const result = await AcademicDepartment.findOne({_id: departmentId});
  return result;
};

const updateSingleAcadmicDepartmentFromDb = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    payload,
    { new: true },
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcadmicDepartmentsFromDb,
  getSingleAcadmicDepartmentFromDb,
  updateSingleAcadmicDepartmentFromDb,
};
