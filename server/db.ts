// import { drizzle } from "drizzle-orm/neon-serverless";
// import { Pool, neonConfig } from "@neondatabase/serverless";
// import * as schema from "@shared/schema";
// import ws from "ws";

// neonConfig.webSocketConstructor = ws;

// // if (!process.env.DATABASE_URL) {
// //   throw new Error(
// //     "DATABASE_URL must be set. Did you forget to provision a database?",
// //   );
// // }

// export const pool = new Pool({ connectionString: "postgresql://neondb_owner:npg_YycwKoLrB5N9@ep-bitter-cake-a4v1a0m9-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" });
// export const db = drizzle({ client: pool, schema });

// // import { drizzle } from "drizzle-orm/node-postgres";
// // import { Pool } from "pg";
// // import * as schema from "@shared/schema";

// // // For your own PostgreSQL server
// // const pool = new Pool({
// //   connectionString: "postgresql://username:password@your-host:5432/your-db",
// // });

// // export const db = drizzle(pool, { schema });



// Use Drizzle with node-postgres instead of Neon
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";

// Connection string for your PostgreSQL server
// Replace with your actual values from docker-compose.yml
const pool = new Pool({
  connectionString: "postgresql://myuser:mypassword@localhost:5432/mydatabase",
});

// Initialize Drizzle ORM
export const db = drizzle(pool, { schema });