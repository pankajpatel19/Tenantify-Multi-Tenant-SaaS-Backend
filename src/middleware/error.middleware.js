const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "error";

  if (process.env.MODE === "developMent") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.log("unExcepted Error", err);

  return res.status(err.statusCode).json({
    status: "error",
    message: "Something Went Wrong",
  });
};

export default errorMiddleware;
