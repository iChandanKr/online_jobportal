const { redis } = require("../dbConnection");
const { CustomError } = require("../utils/apiResponse");

const lockoutMiddleware = async (req, res, next) => {
  const { email } = req.body;

  try {
    let failedAttempts =
      parseInt(await redis.get(`failed_attempts:${email}`)) || 0;
    if (failedAttempts === parseInt(process.env.MAX_FAILED_ATTEMPTS)) {
      const ttl = await redis.ttl(`failed_attempts:${email}`);
      return next(
        new CustomError(
          `Oops, you are locked out, please try after ${Math.floor(
            parseInt(ttl) / 60
          )}  minutes`,
          403
        )
      );
    }

    // Attach failed attempts to the request for later use
    req.failedAttempts = failedAttempts;

    next();
  } catch (error) {
    console.error("Redis error:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

module.exports = lockoutMiddleware;
