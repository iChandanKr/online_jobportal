module.exports = (res, statusCode, message, resData=[]) => {
  return res.status(statusCode).json({
    status: statusCode<400?"Success":"Fail",
    message,
    data: resData,
  });
};
