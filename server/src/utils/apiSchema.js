const Joi = require("joi");

// ---LOGIN SCHEMA---------
const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,}$")).required(),
});

module.exports = {
  loginSchema,
};
