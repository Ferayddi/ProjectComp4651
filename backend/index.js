const express = require("express");
const dotenv = require("dotenv");
let envFilePath = "./environments/.env";
if (process.env.NODE_ENV) {
  envFilePath = `./environments/.env.${process.env.NODE_ENV}`;
}
const cors = require("cors");

const app = express();

dotenv.config({ path: envFilePath });

app.use(cors());
app.use("/uploads", express.static("uploads"));

const http = require("http");
const server = http.createServer(app);

const db = require("./models/index");
server.listen(process.env.PORT || 8080, () => {
  console.log(`server is listening on ${process.env.PORT || 8080}`);
});

db.sync().then(() => {
  console.log("Database connected to comp4651project");
  console.log("db has been synced");
});

const userRouters = require('./routes/users')
const neranalysisRouter = require('./routes/neranalysis')
const crawlRouter = require('./routes/crawl')
const uploadRouters = require("./routes/upload");

app.use(express.json());
app.use('/users', userRouters)
app.use('/neranalysis', neranalysisRouter)
app.use('/crawl', crawlRouter)
app.use("/upload", uploadRouters);

app.get("/", (req, res) => {
  res.send("Server online");
});

module.exports = app;
