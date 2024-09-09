import { Router, Request as RQST } from "express";
import * as Task from "../services/tasksService";
import { Prisma } from "@prisma/client";

const router = Router();
interface Request<T> extends RQST {
  body: T;
}

router.get("/", async (_, res) => {
  const list = await Task.list();
  return list.response(res);
});

router.get("/:id", async (req, res) => {
  const list = await Task.get({
    where: { id: req.params.id },
  });
  return list.response(res);
});

router.post("/", async (req: Request<Prisma.tasksCreateInput>, res) => {
  const task = await Task.create({
    data: req.body,
  });
  return await task.response(res);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.remove({
    where: { id: req.params.id },
  });
  return await task.response(res);
});

router.put("/:id", async (req, res) => {
  const task = await Task.update({
    where: { id: req.params.id },
    data: req.body,
  });
  return await task.response(res);
});

export default router;
