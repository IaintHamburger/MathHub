import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import questRoutes from './routes/quest_routes.js'

dotenv.config()

const app: Express = express()
app.use(cors())
app.use(express.json())

// 模組化路由函式
app.use('/quest', questRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("MathHub API is running...")
});

const PORT: string = process.env.PORT || "5000"
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
