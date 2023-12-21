import { z } from "zod";

const semesterRegistrationValidationZod = z.object({
  body: z.object({
    
  }),
});

const updateSemesterRegistrationValidationZod = z.object({
  body: z.object({
    
  }),
});

export const semesterRegistrationValidation = {
    semesterRegistrationValidationZod,
    updateSemesterRegistrationValidationZod
}