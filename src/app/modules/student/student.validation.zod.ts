import * as z from 'zod';

// Define Zod schemas for validation based on the Mongoose schema

const userNameSchemaZod = z.object({
  firstName: z
    .string()
    .max(20, {
      message: 'First Name should not exceed 20 characters',
    })
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'First Name should start with a capital letter and only contain letters',
    }),
  middleName: z.string().min(1).optional(),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, {
      message: 'Last Name must contain only letters',
    })
    .min(1, {
      message: 'Last Name is required',
    }),
});

const guardianSchemaZod = z.object({
  fatherName: z.string().min(1, {
    message: "Father's Name is required",
  }),
  fatherOccupation: z.string().min(1, {
    message: "Father's Occupation is required",
  }),
  fatherContactNo: z.string().min(1, {
    message: "Father's Contact Number is required",
  }),
  motherName: z.string().min(1, {
    message: "Mother's Name is required",
  }),
  motherOccupation: z.string().min(1, {
    message: "Mother's Occupation is required",
  }),
  motherContactNo: z.string().min(1, {
    message: "Mother's Contact Number is required",
  }),
});

const localGuardianSchemaZod = z.object({
  name: z.string().min(1, {
    message: "Local Guardian's Name is required",
  }),
  occupation: z.string().min(1, {
    message: "Local Guardian's Occupation is required",
  }),
  contactNo: z.string().min(1, {
    message: "Local Guardian's Contact Number is required",
  }),
  address: z.string().min(1, {
    message: "Local Guardian's Address is required",
  }),
});

const createStudentSchemaZod = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
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
      guardian: guardianSchemaZod,
      localGuardian: localGuardianSchemaZod,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
      isDeleted: z.boolean(),
      academicDepartment: z.string()
    }),
  }),
});

const updateUserNameSchemaZod = z.object({
  firstName: z
    .string()
    .max(20, {
      message: 'First Name should not exceed 20 characters',
    })
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'First Name should start with a capital letter and only contain letters',
    }).optional(),
  middleName: z.string().min(1).optional(),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, {
      message: 'Last Name must contain only letters',
    }).optional(),
}).optional();

const updateGuardianSchemaZod = z.object({
  fatherName: z.string().min(1, {
    message: "Father's Name is required",
  }).optional(),
  fatherOccupation: z.string().min(1, {
    message: "Father's Occupation is required",
  }).optional(),
  fatherContactNo: z.string().min(1, {
    message: "Father's Contact Number is required",
  }).optional(),
  motherName: z.string().min(1, {
    message: "Mother's Name is required",
  }).optional(),
  motherOccupation: z.string().min(1, {
    message: "Mother's Occupation is required",
  }).optional(),
  motherContactNo: z.string().min(1, {
    message: "Mother's Contact Number is required",
  }).optional(),
}).optional();

const updateLocalGuardianSchemaZod = z.object({
  name: z.string().min(1, {
    message: "Local Guardian's Name is required",
  }).optional(),
  occupation: z.string().min(1, {
    message: "Local Guardian's Occupation is required",
  }).optional(),
  contactNo: z.string().min(1, {
    message: "Local Guardian's Contact Number is required",
  }).optional(),
  address: z.string().min(1, {
    message: "Local Guardian's Address is required",
  }).optional(),
}).optional();

const updateStudentSchemaZod = z.object({
  body: z.object({
    student: z.object({
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
      guardian: updateGuardianSchemaZod,
      localGuardian: updateLocalGuardianSchemaZod,
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      isDeleted: z.boolean().optional(),
      academicDepartment: z.string().optional()
    }),
  }),
});

export const studentValidationZod = {
  createStudentSchemaZod,
  updateStudentSchemaZod
};
