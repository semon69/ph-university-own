import { academicSemesterMapper } from "./academicSemester.constant"
import { TAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"

const createAcademicSemesterIntoDb = async(payload: TAcademicSemester) => {
    if(academicSemesterMapper[payload.name] !== payload.code){
        throw new Error('Wrong declearation of semester name and code')
    }

    const result = await AcademicSemester.create(payload)
    return result
}

export const academicServices ={
    createAcademicSemesterIntoDb
}