import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function contactApiMockPlugin() {
  return {
    name: "contact-api-mock",
    configureServer(server: any) {
      server.middlewares.use("/api/contact", async (req: any, res: any, next: any) => {
        if (req.method !== "POST") return next();

        try {
          const mod = await import("./src/app/api/contact/route");

          const chunks: Buffer[] = [];
          req.on("data", (chunk: Buffer) => chunks.push(chunk));

          await new Promise<void>((resolve) => {
            req.on("end", () => resolve());
          });

          const rawBody = Buffer.concat(chunks).toString("utf-8");
          const url = `http://localhost${req.url}`;
          const request = new Request(url, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: rawBody,
          });

          const response: Response = await mod.POST(request);
          const text = await response.text();

          res.statusCode = response.status;
          res.setHeader("content-type", response.headers.get("content-type") ?? "application/json");
          res.end(text);
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ message: msg }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), contactApiMockPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
