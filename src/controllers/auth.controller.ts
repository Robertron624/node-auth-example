import { Request, Response } from "express";
import { CreateSessionInput } from "../schema/session.shema";
import { findUserByEmail } from "../services/user.service";
import SessionModel from "../model/session.model";
import logger from "../utils/logger";
import { signAccessToken, signRefreshToken } from "../services/auth.service";

export async function createSessionHandler(
    req: Request<{}, {}, CreateSessionInput>,
    res: Response
) {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    if(!user.verified) {
        return res.status(401).send("Please verify your email");
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        return res.status(401).send("Invalid username or password");
    }

    // Sign an access token

    const accessToken = signAccessToken(user);

    // Sign a refresh token

    const refreshToken = await signRefreshToken({ userId: user.id });

    // Send refresh & access token back

    return res.send({ accessToken, refreshToken });

}
