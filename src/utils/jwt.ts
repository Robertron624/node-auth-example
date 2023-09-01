import jwt from "jsonwebtoken";
import config from "config";
import logger from "./logger";

export function signJwt(
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined
) {

    let signingKey = config.get<string>(keyName);

    try {
        return jwt.sign(object, signingKey, {
            ...(options && options ),
            algorithm: "RS256",
        });
    
    }
    catch (err) {
        console.log("err -> ", err)
        logger.error("EL ERROR AL SIGN JWT ES -> ", err);
    }
}

export function verifyJwt<T>(token: string, keyName: "accessTokenPublicKey" | "refreshTokenPublicKey") : T | null {

    const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");

    try {

        const decoded =  jwt.verify(token, publicKey) as T;

        return decoded;

    }catch (err) {
        logger.error("EL ERROR AL VERIFY TOKEN ES -> ", err);
        return null;
    }

}
