import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Square from './Square.jsx';
import boardStyle from './styles/boardStyle';

const Board = ({ classes, board, onMove }) => {
  return (
    <Grid container>
      {board.map((row, rIdx) => (
        <Grid key={rIdx} item xs={12} className={classes.row}>
          <Grid container justify="center">
            {row.map((col, cIdx) => {
              // the border style for a square as defined by the styles object above
              const border = classes[`${rIdx}_${cIdx}`] || '';
              // remember that 0 is for NONE in our players enum...which we should add
              const marked = col !== 0 ? classes.marked : '';

              return (
                <Grid
                  key={cIdx}
                  item
                  className={classnames(classes.square, border, marked)}
                  onClick={() => onMove({ row: rIdx, col: cIdx })}>
                  <Square player={col} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

const { arrayOf, number, object, func } = PropTypes;

Board.propTypes = {
  classes: object.isRequired,
  board: arrayOf(arrayOf(number)).isRequired,
  onMove: func.isRequired
};

export default boardStyle(Board);