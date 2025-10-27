// import { Pool, PoolClient } from "pg";
// import config from "@/config";

// const pool = new Pool({
//   user: config.DB_USER,
//   host: config.DB_HOST,
//   database: config.DB_DATABASE,
//   password: config.DB_PASSWORD,
//   port: Number(config.DB_PORT),
// });

// pool
//   .connect()
//   .then((client: PoolClient) => {
//     console.log("Connected to PostgreSQL");
//     client.release(); // release the connection back to the pool
//   })
//   .catch((err: Error) => {
//     console.error("Database connection error:", err.stack);
//   });

// export default pool;
