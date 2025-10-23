// middlewares/error.js

class Errorhandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statuscode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.code == 11000) {
    err.message = "Duplicate " + Object.keys(err.keyValue) + " entered";
    err = new Errorhandler(err.message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    err.message = "Json Web Token is invalid, try again";
    err = new Errorhandler(err.message, 400);
  }

  if (err.name === "TokenExpiredError") {
    err.message = "Json Web Token is expired, try again";
    err = new Errorhandler(err.message, 400);
  }

  const errMessage = err.errors
    ? Object.values(err.errors)
        .map((value) => value.message)
        .join(" ")
    : err.message;

  return res.status(err.statuscode).json({
    success: false,
    message: errMessage,
  });
};

// 👇 Export both
export default Errorhandler;

