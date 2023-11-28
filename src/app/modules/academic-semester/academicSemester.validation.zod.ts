import { z } from "zod";


const createAcademicSemesterValidationZod = z.object({
    body: z.object({
        name: z.enum(['Spring' , 'Summer' , 'Fall']),
        year: z.string(),
        code: z.enum(['01', '02', '03']),
        startMonth: z.enum(['January', 'February','March','April', 'May','June','July','August','September', 'October','November','December']),
        endMonth: z.enum(['January', 'February','March','April', 'May','June','July','August','September', 'October','November','December'])
    })
})

export const academicSemesterValidation ={
    createAcademicSemesterValidationZod
}