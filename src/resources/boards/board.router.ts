import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';

import Board from './board.model';
import { TBoard } from './board.type';

import boardsService from './board.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const boards = await boardsService.getAll();

    res.json(boards.map(Board.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { title, columns }: TBoard = req.body;

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
  catchErrors(async (req: Request, res: Response) => {
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
  catchErrors(async (req: Request, res: Response) => {
    const id = String(req.params['id']);
    const { title, columns } = req.body;

    const board = await boardsService.updateById({ id, title, columns });

    if (board) {
      res.status(StatusCodes.OK).json(Board.toResponse(board));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
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
