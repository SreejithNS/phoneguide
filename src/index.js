import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';
import theme from './ui/theme'
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(<MuiThemeProvider theme={theme}><CssBaseline/> <Home /></MuiThemeProvider>, document.getElementById('root'));

// If you want your Home to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
