import { authentication } from "../helpers/authentication.js";
import { tokenCookieOptions } from "../config/tokenCookie.config.js";
import errors from "../config/errors.config.js";

async function login(req, res, next) {
  const { id, secret } = req.body;
  try {
    await authentication.authenticateUser(id, secret);
    const accessTokenPayload = await authentication.encrypt({ id, secret });
    const refreshTokenPayload = await authentication.encrypt({ id });
    const { accessToken, refreshToken } = await authentication.grabTokens(accessTokenPayload, refreshTokenPayload);

    res.cookie("accessToken", accessToken, tokenCookieOptions);
    res.cookie("refreshToken", refreshToken, tokenCookieOptions);

    return res.redirect("/admin");

  } catch (error) {
    next(error);
  };
};

async function logout(req, res, next) {
  try {
    res.clearCookie("accessToken", tokenCookieOptions);
    res.clearCookie("refreshToken", tokenCookieOptions);

    return res.redirect("/");

  } catch (error) {
    next(error);
  };
};

async function refreshAccess(req, res, next) {
  const { refreshToken } = req?.cookies;
  try {
    if (!refreshToken)
      throw errors.forbidden;

    const refreshTokenPayload = await authentication.verifyToken(refreshToken);
    const decryptedData = await authentication.decrypt(refreshTokenPayload);
    const accessToken = await authentication.getNewAccessToken(decryptedData);

    res.cookie("accessToken", accessToken, tokenCookieOptions);

    return res.redirect(req.query.stayin);

  } catch (error) {
    next(error);
  };
};

export default {
  login,
  logout,
  refreshAccess
};