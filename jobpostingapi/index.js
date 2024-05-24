const express = require("express");
const app = express();
const routes = require("./routes/job.routes");
const mongoConnect = require("./services/mongoConnect");
app.use(express.json());
app.use(routes);

const PORT = 8080;
app.listen(PORT, async () => {
  await mongoConnect();
  console.log(`listening to server ${PORT}`);
});
