import { z } from 'zod';

const createAcademicSemesterValidationZod = z.object({
  body: z.object({
    name: z.enum(['Spring', 'Summer', 'Fall']),
    year: z.string(),
    code: z.enum(['01', '02', '03']),
    startMonth: z.enum([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]),
    endMonth: z.enum([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]),
  }),
});
const updateAcademicSemesterValidationZod = z.object({
  body: z.object({
    name: z.enum(['Spring', 'Summer', 'Fall']).optional(),
    year: z.string().optional(),
    code: z.enum(['01', '02', '03']).optional(),
    startMonth: z
      .enum([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ])
      .optional(),
    endMonth: z
      .enum([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ])
      .optional(),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterValidationZod,
  updateAcademicSemesterValidationZod,
};
