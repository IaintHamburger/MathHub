"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const node_process_1 = __importDefault(require("node:process"));
const node_events_1 = require("node:events");
dotenv_1.default.config();
/** @description PostgreSQL 連線池 */
exports.pool = new pg_1.Pool({
    user: node_process_1.default.env.DB_USERNAME,
    host: node_process_1.default.env.DB_HOSTNAME,
    database: node_process_1.default.env.DB_NAME,
    password: '',
    port: parseInt(node_process_1.default.env.DB_PORT || '5432'),
    max: parseInt(node_process_1.default.env.DB_MAX_CONNECT || '10'),
    idleTimeoutMillis: parseInt(node_process_1.default.env.DB_IDLE_TIMEOUT || '60000'),
    connectionTimeoutMillis: parseInt(node_process_1.default.env.DB_CONNECT_TIMEOUT_MS || '5000')
});
/** @description 關閉資料庫連線 */
async function disconnectDatabase() {
    console.log('關閉資料庫連線...');
    await exports.pool.end();
    console.log('已成功關閉資料庫連線.');
    node_process_1.default.exit(0);
}
// 監聽程式終止訊號，關閉資料庫連線
// 使用 EventEmitter 確保只會觸發一次關閉資料庫連線函式
const shutdownEmitter = new node_events_1.EventEmitter();
shutdownEmitter.once('shutdown', disconnectDatabase);
node_process_1.default.on('SIGINT', () => shutdownEmitter.emit('shutdown')); // Ctrl + C 終止
node_process_1.default.on('SIGTERM', () => shutdownEmitter.emit('shutdown')); // 系統發出的終止訊號
node_process_1.default.on('exit', () => shutdownEmitter.emit('shutdown')); // Node.js 正常退出時執行
