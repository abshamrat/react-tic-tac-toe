import { withStyles } from '@material-ui/core/styles';

const borderStyle = '1px solid black';

// styles is a function that accepts the base theme object from material-ui
// and returns an object with either overrides or new styles to apply to 
// components and elements
const styles = (theme) => ({
  // a square's dimension is 100x100px
  square: {
    height: 100,
    width: 100,
    lineHeight: '100px', // this is to center the icon in the square
    fontSize: '48px', // the size of our player's icon
    cursor: 'pointer'
  },
  // if a square is marked, we show the not allowed circle with a line through it
  marked: { cursor: 'not-allowed' },
  // a rows should have its content centered
  row: { textAlign: 'center' },
  // these styles make up the border of the game cross pattern
  '0_1': { borderLeft: borderStyle, borderRight: borderStyle },
  '2_1': { borderLeft: borderStyle, borderRight: borderStyle },
  '1_1': { border: borderStyle },
  '1_0': { borderTop: borderStyle, borderBottom: borderStyle },
  '1_2': { borderTop: borderStyle, borderBottom: borderStyle }
});

export default withStyles(styles);