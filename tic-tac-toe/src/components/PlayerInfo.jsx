import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';


const PlayerInfo = ({ player, gameover }) => {
  const playerSymbol = {1: 'x', 2: 'o'};

  const getGameOverText = (player) => {
    const winnerPlayer = (player === 2 ? 1 : 2);
    return `Game over! Player ${winnerPlayer} (${playerSymbol[winnerPlayer]}) wins.`;
  };

  return (
    <div style={{marginBottom: 20}}>
      {gameover && (
        <Chip
          variant="outlined"
          size="medium"
          label= {getGameOverText(player)}
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
      
      {/* <Typography variant="body1">
        {gameover && "Gameover!"}
        {!gameover && }
      </Typography> */}
    </div>
  );
};

const { number, bool } = PropTypes;

PlayerInfo.propTypes = {
  player: number.isRequired,
  gameover: bool.isRequired
};

export default PlayerInfo;