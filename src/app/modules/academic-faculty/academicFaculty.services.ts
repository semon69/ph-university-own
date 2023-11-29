import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDb = async(payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload)
    return result
}

export const academicFacultyServices = {
    createAcademicFacultyIntoDb
}