import { blueGrey } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteType } from '@material-ui/core';
import { Action } from '../types';
import { ThemeAction } from './actions';

export type ThemeStore = ThemeOptions;
const initialState = {
  palette: {
    primary: blueGrey,
    type: 'dark' as PaletteType,
  },
};

const themeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ThemeAction.SET_PALETTE_COLOR:
      return { ...state, palette: { ...state.palette, primary: action.payload } };
    case ThemeAction.SET_PALETTE_TYPE:
      return { ...state, palette: { ...state.palette, type: action.payload } };
    default:
      return state;
  }
};

export default themeReducer;
