import express from "express";
import { createId } from "@paralleldrive/cuid2";
import db from "./drizzle";
import { authToken } from "./drizzle/schema/authToken";

import errorMiddleware from "./middleware/error";

import healthRouter from "./routes/health";
import notesRouter from "./routes/notes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use((_, res, next) => {
  res.setHeader("X-Powered-By", "your mom");
  next();
});

app.use("/api", healthRouter);
app.use("/api", notesRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

(async () => {
  const dbToken = await db.select().from(authToken).limit(1);

  let token = dbToken.length > 0 ? dbToken[0].token : createId();

  if (dbToken.length === 0) {
    await db.insert(authToken).values({ id: createId(), token: token });
  }

  console.log(`🔑 Auth token: ${token}`);
})();
