import { config } from "dotenv";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { paymentMiddleware, Network, Resource, SolanaAddress } from "x402-hono";
import { facilitator } from "@coinbase/x402"; // For mainnet
config();

const facilitatorUrl = process.env.FACILITATOR_URL as Resource;
const payTo = process.env.ADDRESS as `0x${string}` | SolanaAddress;
const network = process.env.NETWORK as Network;



const app = new Hono();

console.log(`Server is running`);

app.use(
  paymentMiddleware(
    payTo,
    {
      "/mint": {
        price: "$1",
        network: "base",
        config: {
          description: "Mint a new token with $1 USDC.Website : https://www.mkmoonai.com/"
        }
      }
    },
    facilitator
  ),
);

app.get("/mint", c => {
  return c.json({
    report: {
      weather: "Done",
      temperature: 70,
    },
  });
});

serve({
  fetch: app.fetch,
  port: 4021,
});