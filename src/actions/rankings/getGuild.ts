import axios from 'axios';

// Types
import { SET_GUILD_LOADING, GET_GUILD } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getGuild: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = (name: string) => async dispatch => {
  dispatch({ type: SET_GUILD_LOADING, payload: true });

  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + `/guilds/${name}`
    );

    dispatch({ type: GET_GUILD, payload: data });
  } catch (error) {
    dispatch({ type: GET_GUILD, payload: false });
  }

  dispatch({ type: SET_GUILD_LOADING, payload: false });
};

export default getGuild;
