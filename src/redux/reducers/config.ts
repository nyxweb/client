import { SET_CONFIG, SET_CONFIG_FAILED } from 'redux/types/actions';
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
  itemsOptions: null
};

const events = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CONFIG:
      return payload;
    case SET_CONFIG_FAILED:
      return {
        events: false,
        online_time: false,
        vip: false,
        reset: false,
        stats: false
      };
    default:
      return state;
  }
};

export default events;
