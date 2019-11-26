import { Color, PaletteType } from '@material-ui/core';
import { Dispatch } from '../types';

export enum ThemeAction {
  SET_PALETTE_COLOR = 'SET_PALETTE_COLOR',
  SET_PALETTE_TYPE = 'SET_PALETTE_TYPE',
}

export const setThemePaletteColor = (color: Color) => (
  (dispatch: Dispatch) => dispatch({ type: ThemeAction.SET_PALETTE_COLOR, payload: color })
);

export const setThemePaletteType = (type: PaletteType) => (
  (dispatch: Dispatch) => dispatch({ type: ThemeAction.SET_PALETTE_TYPE, payload: type })
);
