import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.config.js";

connectDB(process.env.MONGO_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server Start on http://localhost:3000`);
      console.log("DB Connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
