export default {
    port: 3000,
    mongoUri: "mongodb://127.0.0.1:27017/user-auth",
    logLevel: "info",
    smtp: {
        user: 'wbngqtqgjdapjtiz@ethereal.email',
        pass: 'K6yn19SxhYxtPgRPz9',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
    },
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
};