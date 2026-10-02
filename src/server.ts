import express from "express"
import dotenv from "dotenv"
import { testDbConnection } from "./config/database"
import { initDb } from "./config/initDb"
import authRoutes from "./routes/authRoutes"
import projectRoutes from "./routes/projectRoutes"
import submissionRoutes from "./routes/submissionRoutes"
import commentRoutes from "./routes/commentRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const startServer = async () => {
  await testDbConnection()
  await initDb()

  app.use(express.json())

  app.use('/api/auth', authRoutes)
  app.use('/api',projectRoutes)
  app.use('/api', submissionRoutes)
  app.use('/api', commentRoutes)
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

startServer()