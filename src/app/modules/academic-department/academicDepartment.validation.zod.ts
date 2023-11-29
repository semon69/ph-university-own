import { z } from 'zod';

const createAcademicDepartmentValidationZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be string',
    }),
    academicFaculty: z.string(),
  }),
});

const updateAcademicDepartmentValidationZod = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic faculty must be string',
      })
      .optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const academicDepartmentValiationZod = {
  createAcademicDepartmentValidationZod,
  updateAcademicDepartmentValidationZod,
};
