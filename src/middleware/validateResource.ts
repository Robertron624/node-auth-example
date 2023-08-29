import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import logger from "../utils/logger";

const validateResource = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        // If schema is valid, continue
        return next();

    }catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export default validateResource;