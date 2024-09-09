import { PrismaClient } from "@prisma/client";
import { PrismaClient as LogClient } from "../prisma/logging/default";
import { Response } from "express";

// connect to database
export const database = new PrismaClient({ errorFormat: "pretty" });
export const logClient = new LogClient();

export function log(title: string) {
  logClient.logging.create({
    data: { title },
  });
}

// handeling data on error
export class Error {
  err?: string;
  status = 400;
  constructor(err?: unknown, status?: number) {
    console.log(err);
    if (status !== undefined) {
      this.status = status;
      // send error from prisma to client
      // } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      //   this.err = err.message.split("\n\n").reverse()[0];
      // } else if (err instanceof Prisma.PrismaClientValidationError) {
      //   this.err = err.message.split("\n\n").reverse()[0];
    } else {
      // on not set errors
      this.err = "internal server error";
      this.status = 500;
    }
  }
  async response(response: Response) {
    log(`error found on request ${this.status}: ${this.err}`);
    return response.status(this.status).json({ error: this.err });
  }
}
