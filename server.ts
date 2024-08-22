import * as dotenv from "dotenv";
dotenv.config();
import app from "./src/app";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server starting on ${PORT}`);
});
