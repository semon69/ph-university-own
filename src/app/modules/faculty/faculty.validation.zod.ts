import { z } from 'zod';
import { userNameSchemaZod } from '../student/student.validation.zod';

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
      presentAddress: z.string().min(1, {
        message: 'Present Address is required',
      }),
      permanentAddress: z.string().min(1, {
        message: 'Permanent Address is required',
      }),
      profileImg: z.string().optional(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      isDeleted: z.boolean(),
    }),
  }),
});

export const facultyValidationZod = {
  createFacultySchemaZod,
};
