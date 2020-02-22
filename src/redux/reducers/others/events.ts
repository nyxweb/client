import { CONFIG_EVENTS, CONFIG_EVENTS_FAILED } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Event from 'redux/types/others/Event';

const initialState: Event[] | null = null;

const events = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case CONFIG_EVENTS:
      return payload;
    case CONFIG_EVENTS_FAILED:
      return false;
    default:
      return state;
  }
};

export default events;
