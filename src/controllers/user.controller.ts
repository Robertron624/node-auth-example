import { Request, Response } from "express";
import { CreateUserInput, VerifyUserInput } from "../schema/user.schema";
import logeer from "../utils/logger";
import { createUser, findUserById } from "../services/user.service";
import { sendEmail } from "../utils/mutils";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
) {
    const body = req.body;

    // Use user service to create user

    try {
        const user = await createUser(body);

        // We don't to check if the user already exists because in our User Class we have the unique property for the email field, so if the user already exists, the database will throw an error

        // We send an email to the user to verify their email address

        await sendEmail({
            from: "test@example.com",
            to: user.email,
            subject: "Please verify your account",
            text: `Verification code: ${user.verificationCode}. Id: ${user._id}`,
        });

        return res.status(201).send("User succesfully created");
    } catch (error: any) {
        logeer.error(error);

        // Check if the error is a duplicate key error

        if (error.code === 11000) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    // Find the user in the database by id

    const user = await findUserById(id);

    if (!user) {
        return res.status(404).json({
            message: "Could not verify user",
        });
    }

    // Check if user is already verified

    if (user.verified) {
        return res.status(400).json({
            message: "User already verified",
        });
    }

    // Check if the verification code matches

    if (user.verificationCode === verificationCode) {
        // Set the user to verified and save it to the database

        user.verified = true;
        await user.save();

        return res.status(200).send("User successfully verified");
    }

    // Send error if verification code does not match
    res.status(400).json({
        message: "Could not verify user",
    });

}
