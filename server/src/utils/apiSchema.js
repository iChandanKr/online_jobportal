const Joi = require("joi");

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

// -------------register user schema -----------
const registerUserSchema = Joi.object({
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
});

module.exports = {
  loginSchema,
  registerUserSchema,
};
