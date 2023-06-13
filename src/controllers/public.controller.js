import fs from "fs-extra";
import { authentication } from "../helpers/authentication.js";
import { tokenCookieOptions } from "../config/tokenCookie.config.js";
import errors from "../config/errors.config.js";

async function homepage(req, res, next) {
  try {
    const products = await fs.readJSON("./src/data/products.json");
    const campaigns = await fs.readJSON("./src/data/campaigns.json");
    const config = await fs.readJSON("./src/data/service.config.json");
    return res.render("homepage", { products, campaigns, config });

  } catch (error) {
    next(error);
  };
};

async function viewProduct(req, res, next) {
  const requestedProductId = req.query.id;
  try {
    const products = await fs.readJSON("./src/data/products.json");
    const product = products.find(product => product.id === requestedProductId);
    return res.render("product-overview", { product });

  } catch (error) {
    next(error);
  };
};

async function login(req, res, next) {
  const { id, secret } = req.body;
  try {
    await authentication.verifyUserCredentials(id, secret);
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
  homepage,
  viewProduct,
  login,
  logout,
  refreshAccess
};