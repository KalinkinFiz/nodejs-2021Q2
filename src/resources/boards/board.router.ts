import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import Board from './board.entity';
import boardsService from './board.service';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const boards = await boardsService.getAll();
    return res.status(StatusCodes.OK).json(boards.map(Board.toResponse));
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const { title, columns }: Board = req.body;

    const board = await boardsService.createBoard({ title, columns });

    if (board) {
      res.status(StatusCodes.CREATED).json(Board.toResponse(board));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BOARD_NOT_CREATE', msg: 'Board not create' });
    }
  }),
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const board = await boardsService.getById(id || '');

    if (board) {
      res.json(Board.toResponse(board));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }
  }),
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const board = await boardsService.updateById(id!, req.body);

    if (board) {
      res.status(StatusCodes.OK).json(Board.toResponse(board));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }
  }),
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const board = await boardsService.deleteById(id || '');

    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'BOARD_DELETED', msg: 'The board has been deleted' });
  }),
);

export default router;
