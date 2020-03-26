import { SET_CONFIG } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import ConfigState from '../types/ConfigState';

const initialState: ConfigState = {
  events: null,
  online_time: null,
  vip: null,
  resources: null,
  reset: null,
  stats: null,
  downloads: null,
  change_name: null,
  change_class: null,
  itemsList: null,
  itemsAncient: null,
  itemsOptions: null,
  market: null
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
