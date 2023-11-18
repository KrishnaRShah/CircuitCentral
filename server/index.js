import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import customerRouter from "./routes/customerRouter.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }))
  .use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
  .use(cors());

const PORT = parseInt(process.env.PORT) || 3001;
const CONNECTION =
  "mongodb+srv://mongo:mongodb@cluster0.ddnyu9i.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    mongoose.set('strictQuery', false),
    app.listen(PORT, () =>
      console.log(`Circuit Central server is running on port: ${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

app
  .use('/customer', customerRouter)
