import { z } from 'zod';
import { updateUserNameSchemaZod, userNameSchemaZod } from '../student/student.validation.zod';

const createFacultySchemaZod = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      designation: z.string().max(50),
      name: userNameSchemaZod,
      gender: z
        .enum(['male', 'female', 'others'])
        .refine((val) => val !== undefined && val !== null, {
          message: 'Gender should be specified as male, female, or others',
        }),

      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({
          message: 'Invalid email format',
        })
        .min(1, {
          message: 'Email is required',
        }),
      contactNo: z.string().min(1, {
        message: 'Contact Number is required',
      }),
      emergencyContactNo: z.string().min(1, {
        message: 'Emergency Contact Number is required',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1, {
        message: 'Present Address is required',
      }),
      permanentAddress: z.string().min(1, {
        message: 'Permanent Address is required',
      }),
      profileImg: z.string().optional(),
      academicDepartment: z.string(),
      isDeleted: z.boolean(),
    }),
  }),
});
const updateFacultySchemaZod = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().max(50).optional(),
      name: updateUserNameSchemaZod,
      gender: z
        .enum(['male', 'female', 'others'])
        .refine((val) => val !== undefined && val !== null, {
          message: 'Gender should be specified as male, female, or others',
        }).optional(),

      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({
          message: 'Invalid email format',
        })
        .min(1, {
          message: 'Email is required',
        }).optional(),
      contactNo: z.string().min(1, {
        message: 'Contact Number is required',
      }).optional(),
      emergencyContactNo: z.string().min(1, {
        message: 'Emergency Contact Number is required',
      }).optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1, {
        message: 'Present Address is required',
      }).optional(),
      permanentAddress: z.string().min(1, {
        message: 'Permanent Address is required',
      }).optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const facultyValidationZod = {
  createFacultySchemaZod,
  updateFacultySchemaZod
};
