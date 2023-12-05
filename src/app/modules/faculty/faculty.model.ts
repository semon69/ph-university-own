import { Schema, model } from 'mongoose';
import { FacultyModel, TFaculty } from './faculty.interface';
import { userNameSchema } from '../student/student.model';


const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    role: {
        type: String,
        required: [true, 'Role is required']
    },
    designation: {
        type: String,
        required: [true, 'Designation is required']
    },
    name: {
      type: userNameSchema,
      required: [true, "Faculty's Name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: 'Values must be male, female, or others',
      },
      required: [
        true,
        'Gender is required and should be either male, female, or others',
      ],
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImg: { type: String },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtuals property

// facultySchema.virtual('fullName').get(function () {
//   return (
//     this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
//   );
// });

facultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isStudentExists = await Faculty.findOne(query);
  if (!isStudentExists) {
    throw new Error('This student is not exists. Please update with valid _id');
  }
  next();
});

// query middleware
facultySchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// for custom static method
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

// for custom instance method
// facultySchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
