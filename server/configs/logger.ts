import winston from "winston";
const { combine, timestamp, json, errors } = winston.format;

// Define the logger configuration
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug", // Dynamically set log level
  format: combine(
    errors({ stack: true }), // Log full stack traces
    timestamp(), // Add a timestamp to log entries
    json(), // Output logs in structured JSON format
  ),
  transports: [
    new winston.transports.Console(), // Output to console
    // Add other transports like file logging:
    // new winston.transports.File({ filename: 'app.log' })
  ],
});

export default logger;
