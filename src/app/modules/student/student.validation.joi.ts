import Joi from 'joi';

// Define Joi schemas for validation based on the Mongoose schema

const userNameSchemaJoi = Joi.object({
    firstName: Joi.string()
        .required()
        .max(20)
        .pattern(/^[A-Z][a-z]*$/, 'capitalized')
        .messages({
            'string.base': 'First Name must be a string',
            'string.empty': 'First Name is required',
            'string.max': 'First Name should not exceed 20 characters',
            'string.pattern.base': 'First Name should start with a capital letter and only contain letters',
        }),
    middleName: Joi.string().allow('').optional(),
    lastName: Joi.string()
        .required()
        .pattern(/^[a-zA-Z]+$/, 'letters')
        .messages({
            'string.base': 'Last Name must be a string',
            'string.empty': 'Last Name is required',
            'string.pattern.base': 'Last Name must contain only letters',
        }),
});


const guardianSchemaJoi = Joi.object({
    fatherName: Joi.string().required().messages({
        'string.base': 'Father\'s Name must be a string',
        'string.empty': 'Father\'s Name is required',
    }),
    fatherOccupation: Joi.string().required().messages({
        'string.base': 'Father\'s Occupation must be a string',
        'string.empty': 'Father\'s Occupation is required',
    }),
    fatherContactNo: Joi.string().required().messages({
        'string.base': 'Father\'s Contact Number must be a string',
        'string.empty': 'Father\'s Contact Number is required',
    }),
    motherName: Joi.string().required().messages({
        'string.base': 'Mother\'s Name must be a string',
        'string.empty': 'Mother\'s Name is required',
    }),
    motherOccupation: Joi.string().required().messages({
        'string.base': 'Mother\'s Occupation must be a string',
        'string.empty': 'Mother\'s Occupation is required',
    }),
    motherContactNo: Joi.string().required().messages({
        'string.base': 'Mother\'s Contact Number must be a string',
        'string.empty': 'Mother\'s Contact Number is required',
    }),
});

const localGuardianSchemaJoi = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Local Guardian\'s Name must be a string',
        'string.empty': 'Local Guardian\'s Name is required',
    }),
    occupation: Joi.string().required().messages({
        'string.base': 'Local Guardian\'s Occupation must be a string',
        'string.empty': 'Local Guardian\'s Occupation is required',
    }),
    contactNo: Joi.string().required().messages({
        'string.base': 'Local Guardian\'s Contact Number must be a string',
        'string.empty': 'Local Guardian\'s Contact Number is required',
    }),
    address: Joi.string().required().messages({
        'string.base': 'Local Guardian\'s Address must be a string',
        'string.empty': 'Local Guardian\'s Address is required',
    }),
});

const studentSchemaJoi = Joi.object({
    id: Joi.string().required(),
    name: userNameSchemaJoi.required().messages({
        'object.base': 'Student\'s Name must be an object',
        'any.required': 'Student\'s Name is required',
    }),
    gender: Joi.string().valid('male', 'female', 'others').required().messages({
        'string.base': 'Gender must be a string',
        'any.only': 'Gender must be male, female, or others',
        'any.required': 'Gender is required',
    }),
    dateOfBirth: Joi.string().allow('').optional(),
    email: Joi.string().required().email().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
    contactNo: Joi.string().required().messages({
        'string.base': 'Contact Number must be a string',
        'string.empty': 'Contact Number is required',
    }),
    emergencyContactNo: Joi.string().required().messages({
        'string.base': 'Emergency Contact Number must be a string',
        'string.empty': 'Emergency Contact Number is required',
    }),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
    presentAddress: Joi.string().required().messages({
        'string.base': 'Present Address must be a string',
        'string.empty': 'Present Address is required',
    }),
    permanentAddress: Joi.string().required().messages({
        'string.base': 'Permanent Address must be a string',
        'string.empty': 'Permanent Address is required',
    }),
    guardian: guardianSchemaJoi.required().messages({
        'object.base': 'Guardian details must be an object',
        'any.required': 'Guardian details are required',
    }),
    localGuardian: localGuardianSchemaJoi.required().messages({
        'object.base': 'Local Guardian details must be an object',
        'any.required': 'Local Guardian details are required',
    }),
    profileImg: Joi.string().optional(),
    isActive: Joi.string().valid('active', 'blocked').default('active').optional(),
});

export default studentSchemaJoi;
