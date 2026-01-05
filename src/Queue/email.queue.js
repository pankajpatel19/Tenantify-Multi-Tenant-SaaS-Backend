import { Queue } from "bullmq";
import redisConnection from "../config/redis.config.js";

const emailQueue = new Queue("Email-Queue", { connection: redisConnection });

async function addEmail({ email, inviteLink }) {
  await emailQueue.add(
    "genarate-email",
    {
      email,
      inviteLink,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: 50,
    }
  );
}

export { emailQueue, addEmail };
