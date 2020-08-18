// import 'isomorphic-fetch';
import { newGame, gameover, switchPlayer, winner, movePlayer, actionLog, sessionId } from '../actions/actions';
import { isWinner, isDraw } from '../../../utils/game';


const apiUrl = 'http://localhost:4000/v1/action-logs';
const playerSymbol = {1: 'x', 2: 'o'};

/**
 * Checks for a winner, if there is one, we dispatch two actions, one for winning the 
 * game (winner) and another for gameover.
 * If there isn't a winner, we need to check to see if the game ended in a draw, if so
 * we dispatch the same two actions, but with the player being NONE (0).
 * Finally, do nothing if the above two conditions aren't met.
 * @param {number[][]} board The game board
 * @param {number} player The current player
 * @returns {boolean} True, if there is a winner or a draw, false otherwise
 */
const checkWinner = (board, player) => (dispatch) => {
  let hasWinner = true;

  if (isWinner(board, player)) {
    dispatch(winner(player));
    dispatch(gameover());
  } else if (isDraw(board)) {
    dispatch(winner(0));
    dispatch(gameover());
  } else {
    hasWinner = false;
  }

  return hasWinner;
};

/**
 * When a player plays a turn we need to mark that spot on the board.  We then need to 
 * switch to the next player
 * send the log to api server
 * @param {number} player The current player
 * @param {number} row The row on the board
 * @param {number} col The column on the board
 * @param {string} uuid The session id 
 */
const playTurn = (player, row, col, uuid) => (dispatch) => {
  let nextPlayer;

  switch (player) {
    case 1:
      nextPlayer = 2;
      break;
    case 2:
      nextPlayer = 1;
      break;
    default:
      // throw error?
      break;
  }
  dispatch(movePlayer(player, row, col));
  dispatch(switchPlayer(nextPlayer));

  // We might want to handle error case for sending the action
  return fetch(apiUrl,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': 'secret',
      },
      body: JSON.stringify(
        {
          uuid,
          logMessage: `Player ${player} (${playerSymbol[player]}) move row: ${row}, col: ${col}`
        }
      )
    })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(() => {
      dispatch(movePlayer(player, row, col));
      dispatch(switchPlayer(nextPlayer));
    });
};
/**
 * This functions allow to fetch logs from the api-service
 * @param {number} uuid 
 */
const fetchActionLog = (uuid) => (dispatch) => {

  return fetch(`${apiUrl}/${uuid}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': 'secret',
      },
    })
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(json => dispatch(actionLog(json)));
};

export {
  newGame,
  checkWinner,
  playTurn,
  fetchActionLog,
  sessionId
};