import { TAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"

const createAcademicSemesterIntoDb = async(payload: TAcademicSemester) => {
    const result = await AcademicSemester.create(payload)
    return result
}

export const academicServices ={
    createAcademicSemesterIntoDb
}