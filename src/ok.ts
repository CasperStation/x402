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
      },
    },
    facilitator,
    {
      cdpClientKey: process.env.CDP_CLIENT_KEY,
      appLogo: 'https://pbs.twimg.com/profile_images/1978862702182236160/XpOw1Mp__400x400.jpg',
      appName: 'MKMOON AI',
    }
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
// === X402 Metadata Discovery Endpoint ===
app.get("/.well-known/x402.json", (c) => {
  return c.json({
    version: 1,
    name: "MKMOON AI",
    description: "Mint MKMOON token with 1 USDC via x402 protocol.",
    image: "https://pbs.twimg.com/profile_images/1978862702182236160/XpOw1Mp__400x400.jpg",
    website: "https://www.mkmoonai.com/",
    resources: [
      {
        path: "/mint",
        network: "base",
        price: "$1",
        asset: "USDC",
        description: "Mint MKMOON token",
      },
    ],
  });
});

serve({
  fetch: app.fetch,
  port: 4021,
});