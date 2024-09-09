import { Prisma, tasks } from "@prisma/client";
import { Error, database, log } from ".";
import { Response } from "express";

// ----------------------------------------------------------------- SERIALIZERS
// handeling data when it's true
class _Task {
  task: tasks | tasks[];
  status = 200;
  constructor(task: tasks | tasks[]) {
    this.task = task;
  }
  async response(response: Response) {
    return response.status(this.status).json(this.task);
  }
}
// another actions
class _TaskCreate extends _Task {
  status: number = 201;
}
class _TaskUpdate extends _Task {
  status: number = 203;
}
class _TaskDelete extends _Task {
  status: number = 204;
}

// this fnction validate tasks object level
export function validate(task: Prisma.tasksUpdateInput) {
  if (task.title) {
    if (task.title.toString().length < 3)
      return new Error("minimum length of title is 3", 400);
  }
}

// ----------------------------------------------------------------- HANDLERS

export async function list(props?: Prisma.tasksFindManyArgs) {
  try {
    const tasks = await database.tasks.findMany(props);
    log(`all task fetched where ${props?.where || "-all-"}`);
    return new _Task(tasks);
  } catch (err) {
    return new Error(err);
  }
}
export async function get(props: Prisma.tasksFindFirstArgs) {
  try {
    const task = await database.tasks.findFirstOrThrow(props);
    log(`task with title ${props.where?.id} get`);
    return new _Task(task);
  } catch (err) {
    return new Error(err);
  }
}

export async function create(props: Prisma.tasksCreateArgs) {
  // validate data
  if (props.data.title === undefined)
    return new Error("title is required", 400);
  const validation = validate(props.data);
  if (validation) return validation;

  // add data to database
  try {
    const task = await database.tasks.create(props);
    log(`task with title ${props.data.title} created`);
    return new _TaskCreate(task);
  } catch (err) {
    return new Error(err);
  }
}

export async function update(props: Prisma.tasksUpdateArgs) {
  // validate data
  const validation = validate(props.data);
  if (validation) return validation;

  // update data from database
  try {
    const task = await database.tasks.update(props);
    log(`task id ${props.where.id} updated`);
    return new _TaskUpdate(task);
  } catch (err) {
    return new Error(err);
  }
}

export async function remove(props: Prisma.tasksDeleteArgs) {
  try {
    const task = await database.tasks.delete(props);
    log(`task id ${props.where.id} deleted`);
    return new _TaskDelete(task);
  } catch (err) {
    return new Error(err);
  }
}
