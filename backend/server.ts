import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {AuthRoute} from "./routes/auth.routes";
import {MessageRoute} from "./routes/message.routes";
import {UserRoute} from "./routes/user.routes";
import connectToMongoDB from "./db/connectToMongoDB";
import cookieParser from 'cookie-parser'
import { app ,server } from "./socket/socket";
import path from "path";
// const app: Express = express();
const port = process.env.PORT || 5000;

const _dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth/",AuthRoute);
app.use("/api/messages/",MessageRoute);
app.use("/api/users/",UserRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));

server.listen(port, () => {
  connectToMongoDB();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});