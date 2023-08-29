import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import logeer from '../utils/logger';
import { createUser } from '../services/user.service';

export async function createUserHandler (req: Request< {},  {}, CreateUserInput>, res: Response) {

    const body = req.body;

    // Use user service to create user

    try  {
        const user = await createUser(body); 
        
        // We don't to check if the user already exists because in our User Class we have the unique property for the email field, so if the user already exists, the database will throw an error

        return res.status(201).send("User succesfully created");

    }catch (error: any) {
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