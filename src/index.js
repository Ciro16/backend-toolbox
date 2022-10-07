import express from "express";
import v1Router from "./v1/routes/fileRoutes.js";

import cors from "cors";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);

app.use("/files/data", v1Router);

app.listen(PORT, () => {
  console.log(`I'm listening on port: ${PORT}`);
});
