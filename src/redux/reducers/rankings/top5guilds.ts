import { GET_RANK_5GUILDS, GET_RANK_5GUILDS_FAILED } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Guild from 'redux/types/rankings/Guild';

const initialState: Guild[] | null = null;

const guilds = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RANK_5GUILDS:
      return payload;
    case GET_RANK_5GUILDS_FAILED:
      return false;
    default:
      return state;
  }
};

export default guilds;
