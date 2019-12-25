import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#482B79' },
  secondary: { main: '#FF742F', contrastText: '#ffffff' }
};
const themeName = 'Minsk Burning Orange Drongo';

export default createMuiTheme({ palette, themeName });