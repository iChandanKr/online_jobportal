module.exports = (res, statusCode, message, resData) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data: resData,
  });
};
