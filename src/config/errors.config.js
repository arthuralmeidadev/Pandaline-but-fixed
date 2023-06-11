const unauthorized = Error();
const forbidden = Error();
const notFound = Error();
const internalServerError = Error();

unauthorized.statusCode = 401;
forbidden.statusCode  = 403;
notFound.statusCode = 404;
internalServerError.statusCode = 500;

export default {
  unauthorized,
  forbidden,
  notFound,
  internalServerError,
};