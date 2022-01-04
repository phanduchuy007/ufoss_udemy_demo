import breakpoints from './breakpoints';
import colors from './colors';
import typography from './typography';
import sizes from './sizes.js';

const foundations = {
  colors,
  breakpoints,
  ...typography,
  sizes,
};

export default foundations;
