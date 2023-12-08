import { Types } from "mongoose";

export type TPrerequisiteCourses ={
    course: Types.ObjectId;
    isDeleted: boolean
}

export type TCourse =  {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: [TPrerequisiteCourses];
    isDeleted: boolean
}

export type TCourseFaculty = {
    course: Types.ObjectId;
    faculties: [Types.ObjectId]
}