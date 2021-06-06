import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import Task from './task.model';
import tasksService from './task.service';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const tasks = await tasksService.getAll();

    res.json(tasks.map(Task.toResponse));
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;

    const task = await tasksService.createTask({
      title,
      order,
      description,
      userId,
      boardId: boardId || '',
      columnId,
    });

    if (task) {
      res.status(StatusCodes.CREATED).json(Task.toResponse(task));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }),
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await tasksService.getById(id || '');

    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }),
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;

    const task = await tasksService.updateById({
      id: id || '',
      title,
      order,
      description,
      userId,
      boardId: boardId || '',
      columnId,
    });

    if (task) {
      res.status(StatusCodes.OK).json(Task.toResponse(task));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }),
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await tasksService.deleteById(id || '');

    if (task) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'TASK_DELETED', msg: 'The task has been deleted' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }),
);

export default router;
