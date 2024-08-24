import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes";

const app: Express = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// init db
import "./dbs/init.mongo";
import accessRouter from "./routes/access";
//init routes

// access route
app.use("/", accessRouter);

// protected routes
app.use("/", routes);
// handling error

export default app;
