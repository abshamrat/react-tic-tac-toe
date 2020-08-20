import reducer from '../../redux/game/reducers/reducers';
import * as actions from '../../redux/game/actions/actions';
import * as operations from '../../redux/game/operations/operations';


describe('Tic Tac Toe', () => {
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const drawBoard = [
    [2, 2, 1],
    [1, 1, 2],
    [2, 1, 1]
  ];

  const player1WinBoard = [
    [2, 2, 0],
    [1, 1, 1],
    [2, 2, 0]
  ];

  describe('Reducers', () => {
    it('should have an initial state', () => {
      const expectedState = {
        actionLog: [{}],
        board: [[]],
        gameover: false,
        player: 1,
        winner: -1,
        sessionId: 0
      };

      // we make one up, such as the one below, INIT, empty object or something not in the 
      // game duck as an action
      const action = { type: 'NOT_A_GAME_TYPE' };
      // this should produce the inital state since the type is not one that we handle 
      // in our reducer
      const result = reducer(undefined, action);

      expect(result).toEqual(expectedState);
    });

    it('should start a new game', () => {
      // the current state 
      const state = {
        actionLog: [{}],
        board: emptyBoard,
        gameover: true,
        player: 1,
        winner: -1,
        sessionId: 0
      };

      // the expected state after it has been reduced
      const expectedState = {
        actionLog: [{}],
        board: emptyBoard.slice(),
        gameover: false,
        player: 1,
        winner: -1,
        sessionId: 0
      };

      // the action that will produce the new state
      const action = actions.newGame();
      // the resulting new state
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should end a game', () => {
      const state = {
        actionLog: [{}],
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1,
        sessionId: 0,
      };

      const expectedState = {
        actionLog: [{}],
        board: emptyBoard,
        gameover: true,
        player: 1,
        winner: -1,
        sessionId: 0
      };

      const action = actions.gameover();
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should update the board when a player makes a move', () => {
      const state = {
        actionLog: [{}],
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1,
        sessionId: 0
      };

      const expectedState = {
        actionLog: [{}],
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 1]
        ],
        gameover: false,
        player: 1,
        winner: -1,
        sessionId: 0
      };

      const player = 1;
      const row = 2;
      const col = 2;

      const action = actions.movePlayer(player, row, col);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should win a game', () => {
      const state = {
        actionLog: [{}],
        board: player1WinBoard,
        gameover: false,
        player: 1,
        winner: -1,
        sessionId: 0
      };

      const expectedState = {
        actionLog: [{}],
        board: player1WinBoard,
        gameover: true,
        player: 1,
        winner: 1,
        sessionId: 0,
      };

      const action = actions.winner(1);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('should switch players', () => {
      const state = {
        actionLog: [{}],
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1,
        sessionId: 0,
      };

      const expectedState = {
        actionLog: [{}],
        board: emptyBoard,
        gameover: false,
        player: 2,
        winner: -1,
        sessionId: 0
      };

      const action = actions.switchPlayer(2);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);

      const expectedState2 = {
        actionLog: [{}],
        board: emptyBoard,
        gameover: false,
        player: 2,
        winner: -1,
        sessionId: 0
      };

      const result2 = reducer(state, action);

      expect(result2).toEqual(expectedState2);
    });
  });

  describe('Operations', () => {
    // note that we are only test our complex operations since
    // the reducers already test the simple actions

    const { checkWinner, playTurn } = operations;

    it('should dispatch a winner', () => {
      const dispatch = jest.fn();
      const board = player1WinBoard;
      const player = 1;

      const winnerAction = actions.winner(1);
      const gameoverAction = actions.gameover();

      const winner = checkWinner(board, player)(dispatch);

      expect(winner).toBe(true);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction);
      expect(dispatch.mock.calls[1][0]).toEqual(gameoverAction);
    });

    it('should dispatch a draw', () => {
      const dispatch = jest.fn();
      const board = drawBoard;
      const player = 1;

      const winnerAction = actions.winner(0);
      const gameoverAction = actions.gameover();

      const winner = checkWinner(board, player)(dispatch);

      expect(winner).toBe(true);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction);
      expect(dispatch.mock.calls[1][0]).toEqual(gameoverAction);
    });

    it('should not dispatch if game is in progress', () => {
      const dispatch = jest.fn();
      const board = emptyBoard;
      const player = 1;

      const winner = checkWinner(board, player)(dispatch);

      expect(winner).toBe(false);
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should play a turn', () => {
      const dispatch = jest.fn();

      let player = 1;
      let row = 0;
      let col = 0;

      const move1 = actions.movePlayer(player, row, col);
      const switch1 = actions.switchPlayer(2); // the operation will switch

      playTurn(player, row, col)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(move1);
      expect(dispatch.mock.calls[1][0]).toEqual(switch1);

      player = 2;
      row = 1;
      col = 1;

      const move2 = actions.movePlayer(player, row, col);
      const switch2 = actions.switchPlayer(1); // the operation will switch

      playTurn(player, row, col)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch.mock.calls[2][0]).toEqual(move2);
      expect(dispatch.mock.calls[3][0]).toEqual(switch2);
    });
  });
});