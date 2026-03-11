import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { createServer as createNetServer } from "net";

// ─── Helper: check if a port is free ────────────────────────────────────────
function isPortFree(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const tester = createNetServer()
      .once("error", () => resolve(false))
      .once("listening", () => tester.close(() => resolve(true)))
      .listen(port, "0.0.0.0");
  });
}

// ─── Helper: find next free port starting from `start` ──────────────────────
async function findFreePort(start: number, max = 10): Promise<number> {
  for (let port = start; port < start + max; port++) {
    if (await isPortFree(port)) return port;
  }
  throw new Error(`No free port found in range ${start}–${start + max}`);
}

// ─── Main server ─────────────────────────────────────────────────────────────
async function startServer() {
  const app = express();
  const PREFERRED_PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini AI
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // ── API routes ──────────────────────────────────────────────────────────────
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: message,
        config: {
          systemInstruction:
            "You are SafeTravel AI, a smart travel safety assistant. Provide concise, practical travel safety advice. If the user is in an emergency, advise them to contact local authorities immediately. Keep responses helpful and reassuring.",
        },
      });

      const response = await model;
      res.json({ reply: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        reply:
          "I'm sorry, I'm having trouble connecting to my safety database. Please stay alert and follow local safety guidelines.",
      });
    }
  });

  // ── Vite middleware (dev) / static files (prod) ─────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  // ── Auto port selection ──────────────────────────────────────────────────────
  let PORT: number;
  try {
    PORT = await findFreePort(PREFERRED_PORT);
    if (PORT !== PREFERRED_PORT) {
      console.warn(
        `⚠️  Port ${PREFERRED_PORT} is in use — using port ${PORT} instead.`
      );
    }
  } catch (err) {
    console.error("❌ Could not find a free port. Exiting.");
    process.exit(1);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n🛡️  SafeTravel AI server running on http://localhost:${PORT}\n`);
  });
}

startServer();
