import express, { Router, Request, Response } from 'express'
import { pool } from '../modules/db.js'
import { QueryResult } from 'pg'
import crypto from 'node:crypto'
import { PayloadType, AuthTokenPayload, createRSAToken, parseRSAToken, verifyRSAToken } from '../modules/token.js'

const router: Router = express.Router()

// 新用戶註冊函式
// 先檢查資料庫中是否存在重複的用戶名稱，之後再將密碼進行雜湊處理後寫入資料庫
// 最後將 auth_token 傳送到前端，供後續的身份驗證使用
router.post('/register', async (req: Request<{}, {}, { username: string, password: string }>, res: Response) => {
    try {
        const { username, password }: { username: string, password: string } = req.body

        // 驗證用戶名稱和密碼格式
        const username_valid_format: RegExp = /^[a-zA-Z0-9](?:[a-zA-Z0-9_]{3,62})[a-zA-Z0-9]$/  // 英文字母、數字、底線組成用戶名稱，其中開頭和結尾不可以是底線，最短5位、最長64位
        const password_valid_format: RegExp = /^(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@^_`{|}~]{8,64}$/ // 英文字母和數字組成密碼，至少有一個大寫英文字母、一個特殊字元，最短8位、最長64位
        if (!username_valid_format.test(username) || !password_valid_format.test(password)) {
            res.status(400).send('用戶名稱或密碼格式不正確')
            return
        }

        const auth_username: QueryResult = await pool.query('SELECT USERNAME FROM AUTH WHERE USERNAME = $1', [username])
        if (auth_username.rows.length > 0) {
            res.status(400).send('用戶名稱已存在')
            return
        }

        const salt: crypto.BinaryLike = crypto.randomBytes(16).toString('hex')
        const hashed_password: Buffer = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512')

        await pool.query('INSERT INTO AUTH (USERNAME, PASSWORD, SALT) VALUES ($1, $2, $3)', [username, hashed_password, salt])

        const auth_data: QueryResult = await pool.query('SELECT "ROLE" FROM AUTH WHERE USERNAME = $1', [username])
        /** @description 有效時間長度，單位為秒 */
        const expires_in: number = 86_400
        const payload: AuthTokenPayload = new AuthTokenPayload(username, auth_data.rows[0]["ROLE"], Math.floor(Date.now() + expires_in * 1000))
        const auth_token: string = createRSAToken(payload)
        res.cookie('auth_token', auth_token, {
            'httpOnly': true,
            // 'secure': true, // 只在 HTTPS 下傳輸
            'sameSite': 'strict',
            'maxAge': expires_in * 1000
        })
        res.send('註冊成功')
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

// 用戶登入函式
router.post('/login', async (req: Request<{}, {}, { username: string, password: string }>, res: Response) => {
    try {
        const { username, password }: { username: string, password: string } = req.body

        const auth_data: QueryResult = await pool.query('SELECT PASSWORD, SALT, "ROLE" FROM AUTH WHERE USERNAME = $1', [username])
        if (auth_data.rows.length === 0) {
            res.status(403).send('帳號或密碼錯誤')
            return
        }

        const salt: crypto.BinaryLike = auth_data.rows[0]['salt']
        const hashed_password: Buffer = auth_data.rows[0]['password']
        const hashed_input_password: Buffer = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512')

        const is_password_valid: boolean = crypto.timingSafeEqual(hashed_input_password, hashed_password)

        if (is_password_valid) {
            /** @description 有效時間長度，單位為秒 */
            const expires_in: number = 86_400
            const payload: AuthTokenPayload = new AuthTokenPayload(username, auth_data.rows[0]["ROLE"], Math.floor(Date.now() + expires_in * 1000))
            const token: string = createRSAToken(payload)
            res.cookie('auth_token', token, {
                'httpOnly': true,
                // 'secure': true, // 只在 HTTPS 下傳輸
                'sameSite': 'strict',
                'maxAge': expires_in * 1000
            })
            res.send('登入成功')
        }
        else {
            res.status(403).send('帳號或密碼錯誤')
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

// 驗證 auth_token 函式
// 正式環境可以移除此函式
router.post('/verify', (req: Request, res: Response) => {
    try {
        const auth_token = req.cookies['auth_token']

        if (!auth_token) {
            res.status(401).send('未授權訪問')
        }

        const is_token_valid: boolean = verifyRSAToken(auth_token)
        if (is_token_valid) {
            const token = parseRSAToken(auth_token)
            res.send('Valid' + token.token_payload.toString())
        }
        else {
            res.send('Invalid')
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

export default router

