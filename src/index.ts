import express from "express";
import { config } from "dotenv";
import { paymentMiddleware, Network } from "x402-express";
import { facilitator } from "@coinbase/x402"; // ✅ import facilitator mới

config();

const app = express();

// === ENV CONFIG ===
const payTo = process.env.PAY_TO as `0x${string}`;
const network = (process.env.NETWORK as Network) || "base";

// === CHECK ENV ===
if (!payTo) throw new Error("Missing PAY_TO address in .env");

// === MIDDLEWARE ===
app.use(
  paymentMiddleware(
    payTo,
    {
      "GET /mint": {
        price: "$1.00",
        network,
        config: {
          description: "Access mint endpoint after paying 1 USDC",
        },
      },
    },
    facilitator // ✅ dùng facilitator thay vì { url: ... }
  )
);

// === ROUTE ===
app.get("/mint", async (req: any, res: any) => {
  res.json({ success: true, message: "💰 Payment verified. Access granted." });
});

// Railway will provide PORT via environment variable
const PORT = Number(process.env.PORT) || 4022;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});