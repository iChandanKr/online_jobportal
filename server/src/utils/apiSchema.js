const Joi = require("joi");
const user = {
  firstName: Joi.string().trim().max(50).required().messages({
    "string.empty": "please Enter your Name",
  }),
  lastName: Joi.string().trim().max(40).allow(null, ""),
  dob: Joi.date().required().messages({
    "date.base": "please Enter your DOB ",
    "any.required": "please Enter your DOB ",
  }),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .max(205)
    .required()
    .messages({
      "string.empty": "please Enter your Name",
      "string.email": "Please enter a valid email address!",
      "any.required": "please Enter your Name",
    }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Password and Confirm Password does not match!",
    "any.required": "Confirm Password is required",
  }),
  contact: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": "Contact must be numeric",
      "string.length": "Contact must have exactly 10 digits",
      "any.required": "Contact is required",
    }),
  city: Joi.string().trim().max(100).required().messages({
    "string.empty": "please Enter your City",
    "any.required": "please Enter your City",
  }),
  state: Joi.string().trim().max(100).required().messages({
    "string.empty": "please Enter your State",
    "any.required": "please Enter your State",
  }),
  pinCode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": "Pincode must be numeric",
      "string.length": "Pincode must have exactly 6 digits",
      "any.required": "Pincode is required",
    }),
  country: Joi.string().trim().max(70).required().messages({
    "string.empty": "please Enter your Country",
    "any.required": "please Enter your Country",
  }),
};
// ---LOGIN SCHEMA---------
const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "string.empty": "please Enter your Email",
      "any.required": "please Enter your email",
    }),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,}$"))
    .required()
    .messages({
      "string.empty": "please Enter your Password",
      "any.required": "please Enter your Password",
    }),
  role: Joi.string().valid("jobseeker", "employer").required().messages({
    "any.only": "Role must be either jobseeker or employer",
    "any.required": "Role is required",
  }),
});

// ---LOGOUT SCHEMA---------
const logoutSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.empty": "Refresh token is required for logout",
    "any.required": "Refresh token is required for logout",
  }),
  accessToken: Joi.string().required().messages({
    "string.empty": "Access token is required for logout",
    "any.required": "Access token is required for logout",
  }),
});

// -------------REGISTER USER SCHEMA -----------
const registerJobSeekerSchema = Joi.object(user);

// --------------REGISTER EMPLOYER SCHEMA--------
const registerEmployerSchema = Joi.object({
  ...user,
  department: Joi.string().max(80).required().messages({
    "string.empty": "please Enter Department",
    "any.required": "please Enter Department",
  }),

  designation: Joi.string().max(80).required().messages({
    "string.empty": "please Enter Designation",
    "any.required": "please Enter Designation",
  }),
  companyName: Joi.string().max(150).required().messages({
    "string.empty": "please Enter Company Name",
    "any.required": "please Enter Company Name",
  }),

  companyIndustry: Joi.string().max(100).required().messages({
    "string.empty": "please Enter Company Industry",
    "any.required": "please Enter Company Industry",
  }),

  companyEmail: Joi.string().max(205).email().required().messages({
    "string.empty": "please Enter Email",
    "string.email": "Please enter a valid email address!",
    "any.required": "please Enter Email",
  }),

  companyContact: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "Contact must be numeric and must have exactly 10 digits",
      "string.length": "Contact must have exactly 10 digits",
      "string.pattern.base": "Contact must be numeric",
      "any.required": "Contact must have exactly 10 digits",
    }),

  totalEmployees: Joi.number().integer().min(1).required().messages({
    "number.base": "Please Enter Total Employees",
    "any.required": "Please Enter Total Employees",
    "number.integer": "Total Employees must be a whole number",
    "number.min": "Total Employees must be at least 1",
  }),

  foundedDate: Joi.date().iso().required().messages({
    "date.base": "Please Enter Company Foundation Date",
    "any.required": "Please Enter Company Foundation Date",
  }),
  addressLine1: Joi.string().max(100).required().messages({
    "string.empty": "please Enter Address",
    "any.required": "please Enter Address",
  }),

  addressLine2: Joi.string().max(150).optional().messages({
    "string.empty": "Address Line 2 cannot be empty", // Optional field
  }),

  companyCity: Joi.string().max(100).required().messages({
    "string.empty": "please Enter Company's City",
    "any.required": "please Enter Company's City",
  }),

  companyState: Joi.string().max(100).required().messages({
    "string.empty": "please Enter Company's State",
    "any.required": "please Enter Company's State",
  }),

  companyPincode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "Pincode must have exactly 6 digits",
      "string.length": "Pincode must have exactly 6 digits",
      "string.pattern.base": "Pincode must be numeric",
      "any.required": "Pincode must have exactly 6 digits",
    }),

  companyCountry: Joi.string().max(70).required().messages({
    "string.empty": "please Enter Company's Country",
    "any.required": "please Enter Company's Country",
  }),
  branchName: Joi.string().max(150).required().messages({
    "string.empty": "please Enter Branch Name joi",
    "any.required": "please Enter Branch Name joi",
  }),
});

// --------------UPDATE JOBSEEKER SCHEMA--------

const updateJobseekerSchema = Joi.object({
  firstName: Joi.string().trim().max(50).optional().messages({
    "string.empty": "please Enter your Name",
  }),
  lastName: Joi.string().trim().max(40).allow(null, "").optional(),
  dob: Joi.date().optional().messages({
    "date.base": "please Enter your DOB",
  }),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .max(205)
    .optional()
    .messages({
      "string.empty": "please Enter your Email",
      "string.email": "Please enter a valid email address!",
    }),
  password: Joi.string().min(8).optional().messages({
    "string.min": "Password must be at least 8 characters long",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).optional().messages({
    "any.only": "Password and Confirm Password does not match!",
  }),
  contact: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.pattern.base": "Contact must be numeric",
      "string.length": "Contact must have exactly 10 digits",
    }),
  city: Joi.string().trim().max(100).optional().messages({
    "string.empty": "please Enter your City",
  }),
  state: Joi.string().trim().max(100).optional().messages({
    "string.empty": "please Enter your State",
  }),
  pinCode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.pattern.base": "Pincode must be numeric",
      "string.length": "Pincode must have exactly 6 digits",
    }),
  country: Joi.string().trim().max(70).optional().messages({
    "string.empty": "please Enter your Country",
  }),
});

// --------------UPDATE EMPLOYER SCHEMA--------

const updateEmployerSchema = Joi.object({
  firstName: Joi.string().trim().max(50).optional().messages({
    "string.empty": "please Enter your Name",
  }),
  lastName: Joi.string().trim().max(40).allow(null, "").optional(),
  dob: Joi.date().optional().messages({
    "date.base": "please Enter your DOB ",
  }),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .max(205)
    .optional()
    .messages({
      "string.email": "Please enter a valid email address!",
    }),
  password: Joi.string().min(8).optional().messages({
    "string.min": "Password must be at least 8 characters long",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).optional().messages({
    "any.only": "Password and Confirm Password does not match!",
  }),
  contact: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.pattern.base": "Contact must be numeric",
      "string.length": "Contact must have exactly 10 digits",
    }),
  city: Joi.string().trim().max(100).optional().messages({
    "string.empty": "please Enter your City",
  }),
  state: Joi.string().trim().max(100).optional().messages({
    "string.empty": "please Enter your State",
  }),
  pinCode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.pattern.base": "Pincode must be numeric",
      "string.length": "Pincode must have exactly 6 digits",
    }),
  country: Joi.string().trim().max(70).optional().messages({
    "string.empty": "please Enter your Country",
  }),
  department: Joi.string().max(80).optional().messages({
    "string.empty": "please Enter Department",
  }),
  designation: Joi.string().max(80).optional().messages({
    "string.empty": "please Enter Designation",
  }),
  companyName: Joi.string().max(150).optional().messages({
    "string.empty": "please Enter Company Name",
  }),
  companyIndustry: Joi.string().max(100).optional().messages({
    "string.empty": "please Enter Company Industry",
  }),
  companyEmail: Joi.string().max(205).email().optional().messages({
    "string.email": "Please enter a valid email address!",
  }),
  companyContact: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.length": "Contact must have exactly 10 digits",
      "string.pattern.base": "Contact must be numeric",
    }),
  totalEmployees: Joi.number().integer().min(1).optional().messages({
    "number.base": "Please Enter Total Employees",
    "number.integer": "Total Employees must be a whole number",
    "number.min": "Total Employees must be at least 1",
  }),
  foundedDate: Joi.date().iso().optional().messages({
    "date.base": "Please Enter Company Foundation Date",
  }),
  addressLine1: Joi.string().max(100).optional().messages({
    "string.empty": "please Enter Address",
  }),
  addressLine2: Joi.string().max(150).optional().messages({
    "string.empty": "Address Line 2 cannot be empty",
  }),
  companyCity: Joi.string().max(100).optional().messages({
    "string.empty": "please Enter Company's City",
  }),
  companyState: Joi.string().max(100).optional().messages({
    "string.empty": "please Enter Company's State",
  }),
  companyPincode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.length": "Pincode must have exactly 6 digits",
      "string.pattern.base": "Pincode must be numeric",
    }),
  companyCountry: Joi.string().max(70).optional().messages({
    "string.empty": "please Enter Company's Country",
  }),
  branchName: Joi.string().max(150).optional().messages({
    "string.empty": "please Enter Branch Name joi",
  }),
});

// -------------ADD-JOBPOST -----------
const jobPostSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title must be less than or equal to 100 characters long",
  }),
  description: Joi.string().min(10).max(1000).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max":
      "Description must be less than or equal to 1000 characters long",
  }),
  role: Joi.string().required(),
  location: Joi.string().required(),
  city: Joi.string().required(),
  industryName: Joi.string()
    .valid("software", "finance", "accounting", "manufacturing", "construction")
    .required(),
  skillId: Joi.array().min(1).required(),
  minSalary: Joi.number().required(),
  maxSalary: Joi.number(),
  applicationDeadline: Joi.date(),
  jobType: Joi.string()
    .valid("full-time", "part-time", "internship")
    .required(),
  shift: Joi.string().valid("day", "night").required(),
});
module.exports = {
  loginSchema,
  registerJobSeekerSchema,
  registerEmployerSchema,
  logoutSchema,
  updateJobseekerSchema,
  updateEmployerSchema,
  jobPostSchema,
};
