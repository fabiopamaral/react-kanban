import express from "express";
import cors from "cors";
import { router } from "./router";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`servidor rodando na porta: http://localhost:${PORT}/`)
);
