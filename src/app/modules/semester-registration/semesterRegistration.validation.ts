import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationValidationZod = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemesterRegistrationValidationZod = z.object({
  body: z.object({}),
});

export const semesterRegistrationValidation = {
  semesterRegistrationValidationZod,
  updateSemesterRegistrationValidationZod,
};
