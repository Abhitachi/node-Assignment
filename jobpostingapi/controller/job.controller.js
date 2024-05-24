const express = require("express");

const {
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../model/job.model");

async function httpGetJob(req, res) {
  console.log("returned jobs");
  return res.status(200).json(await getJob());
}

async function httpPostJob(req, res) {
  const response = await createJob(req.body);
  return res.status(201).json(response);
}

async function httpUpdateJob(req, res) {
  return res.status(201).json(await updateJob(req.params.id , req.body));
}

async function httpDeleteJOb(req, res) {
  return res.status(201).json(await deleteJob(req.params.id));
}

module.exports = { httpGetJob, httpPostJob, httpDeleteJOb, httpUpdateJob };
