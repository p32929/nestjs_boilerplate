// @ts-nocheck
export class Constants {
    static PORT = process.env.PORT || 8000;
    static APP_NAME = process.env.APP_NAME || "APP_NAME";
    static EXPIRES_IN = process.env.EXPIRES_IN || "3000s";
    static DATABASE = process.env.DATABASE || "mongodb://localhost/nestmongo1";
    static SECRET = process.env.SECRET || "secretKey";
}