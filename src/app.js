import express from "express";
import helmet from "helmet";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware.js";
import morgan from "morgan";

import AuthRouter from "./routes/auth.routes.js";
import UserRouter from "./routes/user.routes.js";
import ProjectRouter from "./routes/project.routes.js";
import { stream } from "./Logs/streams.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(morgan("combined", { stream }));

app.use("/api/Auth/", AuthRouter);
app.use("/api/User/", UserRouter);
app.use("/api/Project/", ProjectRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(errorMiddleware);

export default app;
