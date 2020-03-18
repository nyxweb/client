import { GET_RANK_5GUILDS, GET_RANK_5GUILDS_FAILED } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Guild from 'redux/types/rankings/Guild';

interface I5Guilds {
  loading: boolean;
  list: Guild[] | null | false;
}

const initialState: I5Guilds = {
  loading: false,
  list: null
};

const guilds = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case GET_RANK_5GUILDS:
      return {
        ...state,
        list: payload
      };
    case GET_RANK_5GUILDS_FAILED:
      return initialState;
    default:
      return state;
  }
};

export default guilds;
