import express from "express";
import bodyParser from "body-parser";
import publicRouter from "./routers/public.router.js";
import protectedRouter from "./routers/protected.router.js";
import { host, port } from "./config/server.config.js";

const server = express();
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true }));

server.set("view engine", "pug");
server.set("views", "src/views");
server.use("/assets", express.static("src/public/assets"));
server.use("/styles", express.static("src/public/styles"));
server.use("/scripts", express.static("src/public/scripts"));

server.use("/", publicRouter);
server.use("/admin", protectedRouter);

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`))