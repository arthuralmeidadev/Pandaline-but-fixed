import { randomBytes } from "crypto";

const jwtSecret = randomBytes(64).toString("hex");

export { jwtSecret };