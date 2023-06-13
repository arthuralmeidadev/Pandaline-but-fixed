import { tokenCookieOptions } from "../config/tokenCookie.config.js";

async function dashboard(req, res, next) {
  try {
    return res.json({ message: "there ye gour boi" });
  } catch (error) {
    next(error);
  };
};

export default {
  dashboard
};