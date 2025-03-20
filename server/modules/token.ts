import crypto, { sign } from 'node:crypto'

/**
 * @description 定義負載資料的種類
 */
export enum PayloadType {
    /** @description 用戶驗證資料 */
    AUTH,
    /** @description 未定義資料 */
    UNDEFINED
}

export class TokenPayload {
    type: PayloadType

    constructor(type: PayloadType) {
        this.type = type
    }

    toString(): string {
        return JSON.stringify(this)
    }

    static parsePayload(payload: string): TokenPayload {
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
        switch (data['type']) {
            case PayloadType.AUTH:
                return new AuthTokenPayload(data['username'], data['role'], data['expires_time'])

            default:
                return new TokenPayload(PayloadType.UNDEFINED)
        }
    }
}

/**
 * @description 用戶 Token 資料
 * @param { string } username 用戶名稱
 * @param { string } role 用戶組
 * @param { number } expires_time 失效時間
 */
export class AuthTokenPayload extends TokenPayload {
    username: string
    role: string
    expires_time: number

    constructor(username: string, role: string, expires_time: number) {
        super(PayloadType.AUTH)
        this.username = username
        this.role = role
        this.expires_time = expires_time
    }
}

const { publicKey, privateKey }: { publicKey: string, privateKey: string } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
})

export function createRSAToken(payload: TokenPayload): string {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
    const encoded_payload = Buffer.from(payload.toString()).toString('base64url')
    const signature = crypto.sign("sha256", Buffer.from(`${header}.${encoded_payload}`), { key: privateKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }).toString('base64url')
    return `${header}.${encoded_payload}.${signature}`
}

export function parseRSAToken(token: string): { header: string, token_payload: TokenPayload, signature: string } {
    const [header, payload, signature] = token.split('.')
    const token_payload: TokenPayload = TokenPayload.parsePayload(payload)
    return { header, token_payload, signature }
}

export function verifyRSAToken(token: string): boolean {
    const [header, payload, signature] = token.split('.')

    if (!header || !payload || !signature) {
        return false
    }

    return crypto.verify('sha256', Buffer.from(`${header}.${payload}`), { key: publicKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, Buffer.from(signature, 'base64url'))
}