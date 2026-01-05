import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.errors({ stack: false }),
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs.log", level: "error" }),
    new winston.transports.File({ filename: "combine.log" }),
  ],

  rejectionHandlers: [
    new winston.transports.File({ filename: "rejection.log" }),
  ],
  exitOnError: false,
});

// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(), // Console par rang-biranga dikhega
//         winston.format.simple()
//       ),
//     })
//   );
// }
export default logger;
