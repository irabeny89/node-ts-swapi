import express, { Errback, Request, Response } from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import moviesRoutes from "../routes/movies.routes"
// express app instance
export const app = express();
// helper middlewares
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// movies routes middleware
app.use("/api", moviesRoutes);
// error middleware
app.use((err: Errback, _req: Request, res: Response) => {
  if (err) return res.status(400).json(err);
});