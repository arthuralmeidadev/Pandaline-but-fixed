import crypto from "crypto";
import jwt from "jsonwebtoken";
import errors from "../config/errors.config.js";
import { keyString, initVectorString } from "../config/encryption.config.js";
import { jwtSecret } from "../config/jwt.config.js";
import fs from "fs-extra";

async function verifyUserCredentials(id, secret) {
  try {
    const users = await fs.readJSON("./src/data/authorizedUsers.json");

    if (!users.some(user => user.id === id && user.secret === secret)) {
      throw errors.unauthorized;
    };

  } catch (error) {
    throw error;
  };
};

async function encrypt(objectData) {
  try {
    const key = Buffer.from(keyString, "hex");
    const initVector = Buffer.from(initVectorString, "hex");
    const cipher = crypto.createCipheriv("aes-256-cbc", key, initVector);
    const stringData = JSON.stringify(objectData);
    const encryptedData = cipher.update(stringData, "utf-8", "hex") + cipher.final("hex");

    return { encryptedData };

  } catch (error) {
    throw error;
  };
};

async function decrypt(stringData) {
  try {
    const key = Buffer.from(keyString, "hex");
    const initVector = Buffer.from(initVectorString, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, initVector);
    const decryptedData = decipher.update(stringData, "hex", "utf-8") + decipher.final("utf-8");
    const objectData = JSON.parse(decryptedData);

    return objectData;

  } catch (error) {
    throw error;
  };
};

async function grabTokens(accessTokenPayload, refreshTokenPayload) {
  try {
    const accessTokenClaims = { expiresIn: "3m" };
    const refreshTokenClaims = { expiresIn: "1d", notBefore: "3m" };
    const accessToken = jwt.sign(accessTokenPayload, jwtSecret, accessTokenClaims);
    const refreshToken = jwt.sign(refreshTokenPayload, jwtSecret, refreshTokenClaims);

    return { accessToken, refreshToken };

  } catch (error) {
    throw error;
  };
};

async function verifyToken(token) {
  try {
    const { encryptedData } = jwt.verify(token, jwtSecret);
    return encryptedData;

  } catch (error) {
    throw error;
  };
};

async function getNewAccessToken(decryptedData) {
  try {
    const users = await fs.readJSON("./src/data/authorizedUsers.json");
    const credentials = users.find(user => user.id == decryptedData.id);
    const accessTokenPayload = await encrypt(credentials);
    const accessTokenClaims = { expiresIn: "3m" };
    const accessToken = jwt.sign(accessTokenPayload, jwtSecret, accessTokenClaims);

    return accessToken;

  } catch (error) {
    throw error;
  };
};


export const authentication = {
  verifyUserCredentials,
  encrypt,
  decrypt,
  grabTokens,
  verifyToken,
  getNewAccessToken
};