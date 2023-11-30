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
      ref: 'AcadmicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmetnSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new Error('Department Already exists');
  }
  next();
});

// academicDepartmetnSchema.pre('findOne', async function (next) {
//   const query = this.getQuery();
//   const isDepartmentExist = await AcademicDepartment.findOne(query);
//   if (!isDepartmentExist) {
//     throw new Error('This department is not exists. Please find with valid _id');
//   }
//   next();
// });

academicDepartmetnSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new Error('This department is not exists. Please update with valid _id');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmetnSchema,
);
