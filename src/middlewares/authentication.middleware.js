import { authentication } from "../helpers/authentication.js";

async function authenticationMiddleware(req, res, next) {
  const { accessToken } = req?.cookies;
  try {
    if (!accessToken)
      throw Error();

    await authentication.verifyToken(accessToken);
    next();
    
  } catch (error) {
    return res.redirect(`/refresh-access?stayin=${req.originalUrl}`);
  };
};

export default authenticationMiddleware;