import { SET_CONFIG } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import ConfigState from '../types/ConfigState';

const initialState: ConfigState = {
  events: null,
  online_time: null,
  reset: null
};

const events = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CONFIG:
      return payload;
    default:
      return state;
  }
};

export default events;
