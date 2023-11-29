import { z } from "zod";

const createAcademicFacultyValidationZod = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must be string',
        })
    })
})
const updateAcademicFacultyValidationZod = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must be string',
        })
    })
})
export const academicFacultyValiationZod = {
    createAcademicFacultyValidationZod,
    updateAcademicFacultyValidationZod
}