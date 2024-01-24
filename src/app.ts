import { envs } from "./config/envs"
import { MongoDatabase } from "./data"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"
;(async () => {
  main()
})()

async function main() {
  try {
    const db = MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })

    const server = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
    })
    server.start()

    const resp = await db
    if (resp) console.log("[mongodb] connected...")
  } catch (error) {
    console.error("ERROR:", error)
  }
}
