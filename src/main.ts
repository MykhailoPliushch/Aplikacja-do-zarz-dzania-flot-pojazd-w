import express from "express";
import { AppModule } from "./app.module";

const app = express();
app.use(express.json());

AppModule(app);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
