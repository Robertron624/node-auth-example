import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import logger from "../utils/logger";

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const accessToken = (req.headers.authorization || "").replace(
        "Bearer ",
        ""
    );

    if(!accessToken) {
        return next();
    }

    try {
        const  decoded = await verifyJwt(accessToken, "accessTokenPublicKey");
        
        if(decoded) {
            res.locals.user = decoded;
        }
        return next();
    } catch (err) {
        logger.error("EL ERROR AL DESERIALIZE USER ES -> ", err);
        return next();
    }

};

export default deserializeUser;