import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cors from "cors"
import express from "express";
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import { errormiddleware } from "./middlewares/errormiddleware.js";
export const app = express();



config({
    path:"./data/config.env"
})




//using middle ware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true,
}))



//USING ROUTE
app.use("/api/v1/users" , userRouter);
app.use("/api/v1/task" , taskRouter);




app.get("/", (req, res) => {
  res.send("hi");
});

app.use(errormiddleware);


