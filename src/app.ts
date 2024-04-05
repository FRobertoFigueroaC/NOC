
import { PrismaClient } from '@prisma/client';
import { MongoDatabase } from './data/mongo';
import { envs } from './config/plugins/envs.plugin';
import { Server } from "./presentation/server"



(async () => {
main()
})();

async function main() {

  await MongoDatabase.conect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  });

  Server.start();
}