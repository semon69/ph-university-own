import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";


const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            enum: ['Spring' , 'Summer' , 'Fall'],
            required: true
        },
        year: {
            type: String,
            required: true
        },
        code: {
            type: String,
            enum: ['01', '02', '03'],
            required: true
        },
        startMonth: {
            type: String,
            enum: ['January', 'February','March','April', 'May','June','July','August','September', 'October','November','December'],
            required: true
        },
        endMonth: {
            type: String,
            enum: ['January', 'February','March','April', 'May','June','July','August','September', 'October','November','December'],
            required: true
        }
    }
)

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)