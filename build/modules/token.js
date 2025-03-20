"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenPayload = exports.TokenPayload = exports.PayloadType = void 0;
exports.createRSAToken = createRSAToken;
exports.parseRSAToken = parseRSAToken;
exports.verifyRSAToken = verifyRSAToken;
const node_crypto_1 = __importDefault(require("node:crypto"));
/**
 * @description 定義負載資料的種類
 */
var PayloadType;
(function (PayloadType) {
    /** @description 用戶驗證資料 */
    PayloadType[PayloadType["AUTH"] = 0] = "AUTH";
    /** @description 未定義資料 */
    PayloadType[PayloadType["UNDEFINED"] = 1] = "UNDEFINED";
})(PayloadType || (exports.PayloadType = PayloadType = {}));
class TokenPayload {
    type;
    constructor(type) {
        this.type = type;
    }
    toString() {
        return JSON.stringify(this);
    }
    static parsePayload(payload) {
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
        switch (data['type']) {
            case PayloadType.AUTH:
                return new AuthTokenPayload(data['username'], data['role'], data['expires_time']);
            default:
                return new TokenPayload(PayloadType.UNDEFINED);
        }
    }
}
exports.TokenPayload = TokenPayload;
/**
 * @description 用戶 Token 資料
 * @param { string } username 用戶名稱
 * @param { string } role 用戶組
 * @param { number } expires_time 失效時間
 */
class AuthTokenPayload extends TokenPayload {
    username;
    role;
    expires_time;
    constructor(username, role, expires_time) {
        super(PayloadType.AUTH);
        this.username = username;
        this.role = role;
        this.expires_time = expires_time;
    }
}
exports.AuthTokenPayload = AuthTokenPayload;
const { publicKey, privateKey } = node_crypto_1.default.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});
function createRSAToken(payload) {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const encoded_payload = Buffer.from(payload.toString()).toString('base64url');
    const signature = node_crypto_1.default.sign("sha256", Buffer.from(`${header}.${encoded_payload}`), { key: privateKey, padding: node_crypto_1.default.constants.RSA_PKCS1_PSS_PADDING }).toString('base64url');
    return `${header}.${encoded_payload}.${signature}`;
}
function parseRSAToken(token) {
    const [header, payload, signature] = token.split('.');
    const token_payload = TokenPayload.parsePayload(payload);
    return { header, token_payload, signature };
}
function verifyRSAToken(token) {
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) {
        return false;
    }
    return node_crypto_1.default.verify('sha256', Buffer.from(`${header}.${payload}`), { key: publicKey, padding: node_crypto_1.default.constants.RSA_PKCS1_PSS_PADDING }, Buffer.from(signature, 'base64url'));
}
