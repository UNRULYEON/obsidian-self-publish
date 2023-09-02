import { Request } from "express";
import { AnyZodObject, ZodError, z } from "zod";
import { badRequest } from "@hapi/boom";

async function validateBody<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req.body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.message);
    }
    return badRequest(JSON.stringify(error));
  }
}

export default validateBody;
