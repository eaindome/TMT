// filepath: /home/ekow/Desktop/TMT/server/src/middleware/validator.js
const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (!error) {
      return next();
    }

    const errors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  };
};

module.exports = { validateRequest };
