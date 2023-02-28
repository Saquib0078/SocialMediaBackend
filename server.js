import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: `${process.env.BASE_URL}`,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type"],
  },
});

//db

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error", err));

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

//autoload routes

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

//socket io
io.on("connect", (socket) => console.log("sockedio=>", socket.id));

const port = process.env.PORT || 8000;

http.listen(port, () => `Server running on port ${port} `);
