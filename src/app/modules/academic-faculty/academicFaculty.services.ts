import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDb = async(payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload)
    return result
}

const getAllAcadmicFacultiesFromDb = async() => {
    const result = await AcademicFaculty.find()
    return result
}

const getSingleAcadmicFacultiesFromDb = async(facultyId: string) => {
    const result = await AcademicFaculty.findById(facultyId)
    return result
}

export const academicFacultyServices = {
    createAcademicFacultyIntoDb,
    getAllAcadmicFacultiesFromDb,
    getSingleAcadmicFacultiesFromDb
}