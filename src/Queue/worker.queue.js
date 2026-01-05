import { Worker } from "bullmq";
import { sendInviteEmail } from "../utils/mailer.js";
import redisConnection from "../config/redis.config.js";

const worker = new Worker(
  "Email-Queue",
  async (job) => {
    const { email, inviteLink } = job;
    await sendInviteEmail(email, inviteLink);
  },
  {
    connection: redisConnection,
  }
);

worker.on("completed", (job) => {
  console.log(`email send to ${job.id}`);
});

worker.on("error", (job, err) => {
  console.log(` ${job.id} failed : ${err.message}`);
});
