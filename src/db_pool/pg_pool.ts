/**
 *     @summary PGPool Class
 *   @functions - query()
 *              - connect()
 */

import pg, { Pool, types } from "pg";
import User from "@/models/users/user";
import config from "@/config";

// Converts PostgreSQL 'timestamp' strings into JavaScript
// Date objects for easier date handling.
const Db_types = pg.types;
const timestamp_OID = 1114;

const parseDates = (val: string) => new Date(Date.parse(val + "+0000"));

Db_types.setTypeParser(timestamp_OID, parseDates);

export default class PGPool {
  pool: pg.Pool;

  constructor(dbConfig: pg.PoolConfig) {
    this.pool = new pg.Pool(dbConfig);
    this.pool.on("error", function (err: Error, client: pg.PoolClient) {
      console.log(`Idle-Client ${err.message} ${err.stack}`);
    });
  }

  async query(
    cUser: User,
    sqlText: string,
    params: any[]
  ): Promise<pg.QueryResult<any>> {
    if (!cUser) {
      throw new Error("Database user not defined.");
    }
    const client = this.pool.connect();
    try {
      (await client).query(
        `SET SESSION postgres.username = '${cUser.username}'`,
        []
      );
      const result = (await client).query(sqlText, params);
    } catch (error) {
      throw error;
    } finally {
      (await client).release;
    }
  }

  async connect(): Promise<pg.PoolClient> {
    const client = await this.pool.connect();
    return client;
  }
}
