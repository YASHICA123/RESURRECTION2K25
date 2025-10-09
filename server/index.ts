import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Registrations -> Google Sheets
  const registrations = require("./routes/registrations");
  app.post("/api/registrations", registrations.saveRegistration);
  app.post("/api/registrations/mark-paid", registrations.markPaid);

  // Razorpay payment
  const razorpay = require("./routes/razorpay");
  app.post("/api/razorpay/order", razorpay.createOrder);
  app.post("/api/razorpay/verify", razorpay.verifyPayment);

  return app;
}
