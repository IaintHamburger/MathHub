/**
 * @description 定義負載資料的種類
 */
export declare enum PayloadType {
    /** @description 用戶驗證資料 */
    AUTH = 0,
    /** @description 未定義資料 */
    UNDEFINED = 1
}
export declare class TokenPayload {
    type: PayloadType;
    constructor(type: PayloadType);
    toString(): string;
    static parsePayload(payload: string): TokenPayload;
}
/**
 * @description 用戶 Token 資料
 * @param { string } username 用戶名稱
 * @param { string } role 用戶組
 * @param { number } expires_time 失效時間
 */
export declare class AuthTokenPayload extends TokenPayload {
    username: string;
    role: string;
    expires_time: number;
    constructor(username: string, role: string, expires_time: number);
}
export declare function createRSAToken(payload: TokenPayload): string;
export declare function parseRSAToken(token: string): {
    header: string;
    token_payload: TokenPayload;
    signature: string;
};
export declare function verifyRSAToken(token: string): boolean;
