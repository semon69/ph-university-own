import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDb = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  
  return result;
};

const getSingleAcademicDepartmentFromDb = async (departmentId: string) => {
  const result = await AcademicDepartment.findOne({_id: departmentId}).populate('academicFaculty');
  return result;
};

const updateSingleAcademicDepartmentFromDb = async (
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
  getAllAcademicDepartmentsFromDb,
  getSingleAcademicDepartmentFromDb,
  updateSingleAcademicDepartmentFromDb,
};
