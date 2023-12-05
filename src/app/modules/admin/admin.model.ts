import { Schema, model } from 'mongoose';
import { userNameSchema } from '../student/student.model';
import { AdminModel, TAdmin } from './admin.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    needsPasswordChange: {
      type: Boolean,
      required: [true, 'Needs change password is required'],
      default: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
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
    managementDepartment: {
      type: String,
      required: [true, 'Management Department is required'],
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

// pre save middleware / hooks to bcrypt password
adminSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const admin = this;
  // hashing password
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set empty password field
adminSchema.post('save', async function (doc, next) {
  doc.password = ' ';
  next();
});

// virtuals property

// adminSchema.virtual('fullName').get(function () {
//   return (
//     this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
//   );
// });

adminSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isAdminExists = await Admin.findOne(query);
  if (!isAdminExists) {
    throw new Error('This student is not exists. Please update with valid _id');
  }
  next();
});

// query middleware
adminSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// for custom static method
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

// for custom instance method
// adminSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
