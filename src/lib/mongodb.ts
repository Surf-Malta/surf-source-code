import mongoose from "mongoose";
import dns from "dns";

// Fix SRV resolution errors by prioritizing IPv4
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sourcecode_db";

function resolveMongodbSrv(uri: string): Promise<string> {
  if (!uri.startsWith("mongodb+srv://")) return Promise.resolve(uri);

  return new Promise((resolve) => {
    try {
      const match = uri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]*)(?:\?(.*))?$/);
      if (!match) return resolve(uri);

      const [, username, password, host, database, optionsStr] = match;

      if (host === "cluster0.i56xyjt.mongodb.net") {
        const hosts = "ac-zjdzh1s-shard-00-00.i56xyjt.mongodb.net:27017,ac-zjdzh1s-shard-00-01.i56xyjt.mongodb.net:27017,ac-zjdzh1s-shard-00-02.i56xyjt.mongodb.net:27017";
        const allOptions = ["authSource=admin", "replicaSet=atlas-u8lwor-shard-0", "ssl=true", optionsStr].filter(Boolean).join("&");
        const resolvedUri = `mongodb://${username}:${password}@${hosts}/${database}?${allOptions}`;
        console.log("Directly mapped cluster0 host to replica set URI");
        return resolve(resolvedUri);
      }

      dns.resolveSrv(`_mongodb._tcp.${host}`, (err, srvRecords) => {
        if (err || !srvRecords || srvRecords.length === 0) {
          console.error("SRV resolution failed, falling back to original URI:", err);
          return resolve(uri);
        }

        srvRecords.sort((a, b) => a.priority - b.priority || b.weight - a.weight);
        const hosts = srvRecords.map(r => `${r.name}:${r.port}`).join(",");

        dns.resolveTxt(host, (txtErr, txtRecords) => {
          let txtOptions = "";
          if (!txtErr && txtRecords && txtRecords.length > 0) {
            txtOptions = txtRecords.flat().join("&");
          }

          const allOptions = [txtOptions, optionsStr, "ssl=true"].filter(Boolean).join("&");
          const resolvedUri = `mongodb://${username}:${password}@${hosts}/${database}?${allOptions}`;
          console.log("Successfully pre-resolved SRV to standard mongodb:// URI");
          resolve(resolvedUri);
        });
      });
    } catch (e) {
      console.error("Error during SRV resolution:", e);
      resolve(uri);
    }
  });
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCached: GlobalMongoose | undefined;
}

let cached: GlobalMongoose = global.mongooseCached || { conn: null, promise: null };

if (!global.mongooseCached) {
  global.mongooseCached = cached;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = resolveMongodbSrv(MONGODB_URI)
      .then((resolvedUri) => {
        return mongoose.connect(resolvedUri, opts);
      })
      .then((m) => {
        return m;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
