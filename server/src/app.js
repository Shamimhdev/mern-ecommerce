import express from "express";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", routes);

// Always last
app.use(errorHandler);

export default app;
