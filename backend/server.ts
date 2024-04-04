import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {AuthRoute} from "./routes/auth.routes";
import {MessageRoute} from "./routes/message.routes";
import {UserRoute} from "./routes/user.routes";
import connectToMongoDB from "./db/connectToMongoDB";
import cookieParser from 'cookie-parser'


const app: Express = express();
const port = process.env.PORT || 3000;


dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth/",AuthRoute);
app.use("/api/message/",MessageRoute);
app.use("/api/user/",UserRoute);



app.listen(port, () => {
  connectToMongoDB();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});