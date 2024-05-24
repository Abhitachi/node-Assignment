const express = require("express");
const {
  httpPostJob,
  httpGetJob,
  httpUpdateJob,
  httpDeleteJOb,
} = require("../controller/job.controller");

const router = express.Router();

router.post("/job", httpPostJob);

router.get("/job", httpGetJob);

router.put("/job/:id", httpUpdateJob);

router.delete("/job/:id", httpDeleteJOb);

module.exports = router;
