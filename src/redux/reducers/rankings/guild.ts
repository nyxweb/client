import { SET_GUILD_LOADING, GET_GUILD } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Guild from 'redux/types/rankings/Guild';

interface IGuild {
  loading: boolean;
  data: Guild | null | false;
}

const initialState: IGuild = {
  loading: false,
  data: null
};

const guild = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case SET_GUILD_LOADING:
      return {
        ...state,
        loading: payload
      };
    case GET_GUILD:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default guild;
