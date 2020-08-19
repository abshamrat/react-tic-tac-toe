import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { gameOperations } from '../redux/game';
import Board from '../components/Board.jsx';
import PlayerInfo from '../components/PlayerInfo.jsx';
import GameoverDialog from '../components/GameoverDialog.jsx';
import ActionLog from '../components/ActionLog.jsx';

class Game extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { showDialog: false };

    // binding 'this' to the handler so we can use 'this' to refer to props of this class
    this.handleBoardOnMove = this.handleBoardOnMove.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.board !== prevState.board) {
      const { fetchActionLog, board, sessionId } = nextProps;
      fetchActionLog(sessionId);
      return ({ board });
    }
    return null;
  }
  handleBoardOnMove(square) {
    const { 
      board,
      player,
      gameover,
      playTurn,
      checkWinner,
      sessionId,
    } = this.props;
    const { row, col } = square;

    // only mark if the game is still in progress and the square is empty (none)
    // otherwise, ignore the play
    if (gameover || board[row][col] !== 0) {
      return;
    }

    // make a play for the player
    playTurn(player, row, col, sessionId);
    // then check for a winner
    const hasWinner = checkWinner(board, player);

    if (hasWinner) {
      this.setState({ showDialog: true });
    }
  }

  handleDialogClick(answer) {
    // we only want to start a new game if the player clicks 'yes'
    if (answer) {
      this.props.newGame();
      this.props.reSetSessionId(uuid());
    }

    // we always want to close the dialog
    this.setState({ showDialog: false });
  }

  handleDialogClose() {
    // close the dialog    
    this.setState({ showDialog: false });
  }

  render() {
    const { showDialog } = this.state;
    const { board, player, gameover, winner, actionLog } = this.props;
    const draw = winner === 0;

    return (
      <div>
        <Grid 
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="space-between"
          style={{ minHeight: '38vh', marginTop: 40 }}
        >
          <Grid item xs={12} sm={12} md={12} style={{marginBottom: 10}}>
            <PlayerInfo player={player} gameover={gameover} winner={winner} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Board board={board} onMove={this.handleBoardOnMove} />
          </Grid>
        </Grid>
        <ActionLog actionLog={actionLog} />
        <GameoverDialog
          open={showDialog}
          isDraw={draw}
          player={winner}
          onClick={this.handleDialogClick}
          onClose={this.handleDialogClose} />
      </div>
    );
  }
}

const { arrayOf, number, func, bool } = PropTypes;

// we want to list our props for validation even though 
// we are using react-redux to map our state and dispatch
// to the props of this Game component
Game.propTypes = {
  board: arrayOf(arrayOf(number)).isRequired,
  player: number.isRequired,
  winner: number.isRequired,
  gameover: bool.isRequired,
  playTurn: func.isRequired,
  checkWinner: func.isRequired,
  newGame: func.isRequired
};

const mapStateToProps = (state) => {
  const { gameState } = state;

  return {
    board: gameState.board,
    player: gameState.player,
    gameover: gameState.gameover,
    winner: gameState.winner,
    actionLog: gameState.actionLog,
    sessionId: gameState.sessionId,
  };
};

const mapDispatchToProps = {
  playTurn: gameOperations.playTurn,
  checkWinner: gameOperations.checkWinner,
  newGame: gameOperations.newGame,
  fetchActionLog: gameOperations.fetchActionLog,
  reSetSessionId: gameOperations.sessionId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);