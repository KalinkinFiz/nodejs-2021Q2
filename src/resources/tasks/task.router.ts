const { StatusCodes } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');

const tasksService = require('./task.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await tasksService.getAll();

    res.json(tasks.map(Task.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { boardId } = req.params;
    const { id, title, order, description, userId, columnId } = req.body;

    const task = await tasksService.createTask({
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });

    if (task) {
      res.status(StatusCodes.CREATED).json(Task.toResponse(task));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }),
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const task = await tasksService.getById(id);

    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }),
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id, boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;

    const task = await tasksService.updateById({
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });

    if (task) {
      res.status(StatusCodes.OK).json(Task.toResponse(task));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const task = await tasksService.deleteById(id);

    if (task) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'TASK_DELETED', msg: 'The task has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }),
);

module.exports = router;
