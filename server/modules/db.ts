import dotenv from 'dotenv'
import { Pool } from 'pg'
import process from 'node:process'
import { EventEmitter } from 'node:events'

dotenv.config()

/** @description PostgreSQL 連線池 */
export const pool: Pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_NAME,
    password: '',
    port: parseInt(process.env.DB_PORT || '5432'),
    max: parseInt(process.env.DB_MAX_CONNECT || '10'),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '60000'),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECT_TIMEOUT_MS || '5000')
})

/** @description 關閉資料庫連線 */
async function disconnectDatabase(): Promise<void> {
    console.log('關閉資料庫連線...')
    await pool.end()
    console.log('已成功關閉資料庫連線.')
    process.exit(0)
}

// 監聽程式終止訊號，關閉資料庫連線
// 使用 EventEmitter 確保只會觸發一次關閉資料庫連線函式
const shutdownEmitter: EventEmitter = new EventEmitter()
shutdownEmitter.once('shutdown', disconnectDatabase)

process.on('SIGINT', () => shutdownEmitter.emit('shutdown')) // Ctrl + C 終止
process.on('SIGTERM', () => shutdownEmitter.emit('shutdown')) // 系統發出的終止訊號
process.on('exit', () => shutdownEmitter.emit('shutdown')) // Node.js 正常退出時執行