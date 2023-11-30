import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

export const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isFacultyExists = await AcademicFaculty.findOne(query);
  if (!isFacultyExists) {
    throw new Error('This faculty is not exists. Please update with valid _id');
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcadmicFaculty',
  academicFacultySchema,
);
