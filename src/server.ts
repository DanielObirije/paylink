/**
 * node modules
 */
import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

/**
 * custom modules
 */
import config from "@/config";

import limiter from "@/libs/express_rate_limit";

/**
 * router
 */
import v1Routes from "@/routes/v1";

/**
 * types
 */
import type { CorsOptions } from "cors";
import rateLimit from "express-rate-limit";

/**
 * express app initial
 */
const app = express();

//configure cors options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === "development" ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORES Error: ${origin} is not allowed by CORES`),
        false
      );
    }
  },
};

// apply cors middleware
app.use(cors(corsOptions));

//enable JASON request body parsing
app.use(json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression({ threshold: 1024 })); //only compress responses larger than 1KB

app.use(helmet());

//enable rate limitting
// app.use(rateLimit);

(async () => {
  try {
    app.use("/api/v1", v1Routes);
    app.listen(config.PORT, () => {
      console.log(`Server is running at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server", error);
    if (config.NODE_ENV === "production") {
      process.exit(1);
    }
  }
})();

/**
 * handles server shutdown gracfully
 */

const handleServerShutdown = async () => {
  try {
    console.log("Server SHUTDOWN");
    process.exit(0);
  } catch (error) {
    console.log("Error during server shutdown", error);
  }
};

process.on("SIGTERM", handleServerShutdown);
process.on("SIGINT", handleServerShutdown);
