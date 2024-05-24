const Job = require("../model/job.schema");

async function getJob() {
  return await Job.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function deleteJob(jobId) {
  await Job.findByIdAndDelete(jobId);
  return { message: "deleted Successfully" };
}

async function updateJob(jobId, updatedData) {
  await Job.findByIdAndUpdate(jobId, updatedData);
  return { message: "updated Successfully" };
}

async function createJob(jobDescription) {
  const newJob = new Job(jobDescription);
  await newJob.save();
  return { message: "created Successfully" };
}

module.exports = { createJob, getJob, deleteJob, updateJob };
