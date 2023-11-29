import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

export const academicDepartmetnSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcadmicDepartment',
  academicDepartmetnSchema,
);
