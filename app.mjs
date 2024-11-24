import express from "express";
import path from "path";
import middleware from "./middleware/index.mjs";
import connectDB from "./db/connectDB.mjs";
import errorHandler from "./middleware/errorHandler.mjs";

import routes from "./routes/index.mjs";

const app = express();

connectDB();
middleware(app);
app.use("/", routes);
errorHandler(app);

export default app;
