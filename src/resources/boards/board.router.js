const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const Board = require('./board.model');

const boardsService = require('./board.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();

    res.json(boards.map(Board.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { id, title, columns } = req.body;

    const board = await boardsService.createBoard({ id, title, columns });

    if (board) {
      res.status(StatusCodes.CREATED).json(Board.toResponse(board));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BOARD_NOT_CREATE', msg: 'Board not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const board = await boardsService.getById(id);

    if (board) {
      res.json(Board.toResponse(board));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;

    const board = await boardsService.updateById({ id, title, columns });

    if (board) {
      res.status(StatusCodes.OK).json(Board.toResponse(board));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const board = await boardsService.deleteById(id);

    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'BOARD_NOT_FOUND', msg: 'Board not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'BOARD_DELETED', msg: 'The board has been deleted' });
  })
);

module.exports = router;
