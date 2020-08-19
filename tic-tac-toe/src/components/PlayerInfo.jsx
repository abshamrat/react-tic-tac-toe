import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';


const PlayerInfo = ({ player, gameover, winner }) => {

  const playerSymbol = {1: 'x', 2: 'o'};
  const getGameOverText = (winner) => {
    const drawText = 'Match draw.';
    const additionalText = winner === 0 ? drawText : `Player ${winner} (${playerSymbol[winner]}) wins.`;
    return `Game over! ${additionalText}`;
  };

  return (
    <div style={{marginBottom: 20}}>
      {gameover && (
        <Chip
          variant="outlined"
          size="medium"
          label= {getGameOverText(winner)}
          color="primary"
        />
      )}
      {!gameover && (
        <Chip
          variant="outlined"
          size="medium"
          icon={<FaceIcon />}
          label={`Player: ${player} (${playerSymbol[player]})`}
          color="primary"
        />
      )}
    </div>
  );
};

const { number, bool } = PropTypes;

PlayerInfo.propTypes = {
  player: number.isRequired,
  gameover: bool.isRequired,
  winner: number.isRequired
};

export default PlayerInfo;