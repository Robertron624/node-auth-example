import { Request, Response } from "express";
import { CreateSessionInput } from "../schema/session.shema";
import { findUserByEmail, findUserById } from "../services/user.service";
import SessionModel from "../model/session.model";
import logger from "../utils/logger";
import { findSessionById, signAccessToken, signRefreshToken } from "../services/auth.service";
import { get } from "lodash";
import { signJwt, verifyJwt } from "../utils/jwt";

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


export async function refreshAccessTokenHandler(
    req: Request,
    res: Response
) {

    const refreshToken = get(req, "headers.x-refresh") as string;

    const decoded = verifyJwt<{session: string}>(refreshToken, "refreshTokenPublicKey");

    if(!decoded) {
        return res.status(401).send("Could not verify refresh token");
    }

    const session = await findSessionById(decoded.session);

    if(!session || !session?.valid) {
        return res.status(401).send("Invalid refresh token");
    }

    const user = await findUserById(String(session.user));

    if(!user) {
        return res.status(401).send("Could not find user");
    }

    const accessToken = signAccessToken(user);

    return res.send({ accessToken });
}