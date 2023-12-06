import { Schema, model } from 'mongoose';
import { userNameSchema } from '../student/student.model';
import { AdminModel, TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
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
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImg: { type: String },
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

adminSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isAdminExists = await Admin.findById(query);
  if (!isAdminExists) {
    throw new Error('This admin is not exists. Please update with valid _id');
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
  const existingUser = await Admin.findById(id);
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
