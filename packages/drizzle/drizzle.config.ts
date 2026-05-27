import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// 루트 .env.local 로드 (모노레포 단일 env 정책)
config({ path: "../../.env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  out: "./migrations",
  schema: "./schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  casing: "snake_case",
  verbose: true,
  strict: true,
});
